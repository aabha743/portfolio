import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type SnapCtx = {
  current: number;
  goTo: (i: number) => void;
  count: number;
  enabled: boolean;
};

const Ctx = createContext<SnapCtx | null>(null);
export const useSnap = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useSnap outside provider");
  return c;
};

const easeInOutQuart = (t: number) =>
  t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

export function SnapScroll({
  sections,
  sectionIds,
  children,
}: {
  sections: ReactNode[];
  sectionIds: string[];
  children?: ReactNode;
}) {
  const count = sections.length;
  const [current, setCurrent] = useState(0);
  const [target, setTarget] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);
  const currentRef = useRef(0);
  const lastWheelRef = useRef(0);
  const deltaRef = useRef(0);
  const [enabled] = useState(true);

  const animateTo = useCallback((targetVal: number) => {
    const container = containerRef.current;
    if (!container) return;
    targetVal = Math.max(0, Math.min(count - 1, targetVal));
    if (targetVal === currentRef.current || animatingRef.current) return;

    setTarget(targetVal);

    const sections = container.querySelectorAll(".snap-section");
    const enteringEl = sections[targetVal] as HTMLElement;
    const leavingEl = sections[currentRef.current] as HTMLElement;
    const goingDown = targetVal > currentRef.current;

    // Use actual offsetTop not calculated height — works on all screen sizes
    const endY = enteringEl.offsetTop;

    if (leavingEl) leavingEl.classList.add(goingDown ? "section-exit-up" : "section-exit-down");
    if (enteringEl) {
      enteringEl.classList.add(goingDown ? "section-enter-down" : "section-enter-up");
      enteringEl.getBoundingClientRect();
      requestAnimationFrame(() => {
        enteringEl.classList.remove("section-enter-down", "section-enter-up");
        enteringEl.classList.add("section-entering");
      });
    }

    animatingRef.current = true;
    const startY = container.scrollTop;
    const startT = performance.now();
    const dur = 900;

    const step = (now: number) => {
      const t = Math.min(1, (now - startT) / dur);
      const e = easeInOutQuart(t);
      container.scrollTop = startY + (endY - startY) * e;

      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        container.scrollTop = endY;
        currentRef.current = targetVal;
        setCurrent(targetVal);
        setTarget(null);
        animatingRef.current = false;
        deltaRef.current = 0;
        // Always clean up animation classes on completion (delayed to prevent React z-index race flicker)
        setTimeout(() => {
          sections.forEach(el => {
            el.classList.remove(
              "section-exit-up", "section-exit-down",
              "section-enter-down", "section-enter-up",
              "section-entering"
            );
          });
        }, 50);
      }
    };

    requestAnimationFrame(step);
  }, [count]);

  const goTo = useCallback((i: number) => animateTo(i), [animateTo]);

  useEffect(() => {
    if (!enabled) return;

    const container = containerRef.current;
    if (!container) return;

    const getSectionEl = () =>
      container.querySelectorAll(".snap-section")[currentRef.current] as HTMLElement | null;

    const sectionIsScrollable = (el: HTMLElement) => {
      const style = window.getComputedStyle(el);
      const paddingTop = parseFloat(style.paddingTop) || 0;
      const paddingBottom = parseFloat(style.paddingBottom) || 0;
      const contentHeight = el.scrollHeight - paddingTop - paddingBottom;
      return contentHeight > window.innerHeight - paddingTop - paddingBottom + 4;
    };

    const sectionAtTop = (el: HTMLElement) =>
      el.scrollTop <= 2;

    const sectionAtBottom = (el: HTMLElement) =>
      el.scrollTop + el.clientHeight >= el.scrollHeight - 4;

    const onWheel = (e: WheelEvent) => {
      if (animatingRef.current) {
        e.preventDefault();
        return;
      }

      const el = getSectionEl() as HTMLElement | null;
      if (el && sectionIsScrollable(el)) {
        const goingDown = e.deltaY > 0;
        if (goingDown && !sectionAtBottom(el)) {
          el.scrollBy({ top: e.deltaY * 1.5, behavior: "auto" });
          return;
        }
        if (!goingDown && !sectionAtTop(el)) {
          el.scrollBy({ top: e.deltaY * 1.5, behavior: "auto" });
          return;
        }
      }

      e.preventDefault();
      const now = performance.now();
      if (now - lastWheelRef.current > 100) deltaRef.current = 0;
      lastWheelRef.current = now;
      deltaRef.current += e.deltaY;
      if (Math.abs(deltaRef.current) > 50) {
        animateTo(currentRef.current + (deltaRef.current > 0 ? 1 : -1));
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (animatingRef.current) return;
      if (["ArrowDown", "PageDown"].includes(e.key)) { e.preventDefault(); animateTo(currentRef.current + 1); }
      else if (["ArrowUp", "PageUp"].includes(e.key)) { e.preventDefault(); animateTo(currentRef.current - 1); }
      else if (e.key === "Home") { e.preventDefault(); animateTo(0); }
      else if (e.key === "End") { e.preventDefault(); animateTo(count - 1); }
    };

    let touchStartY = 0;
    let touchStartX = 0;

    const onTouchStart = (e: TouchEvent) => {
      if (animatingRef.current) return;
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (animatingRef.current) return;
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      const diffY = touchStartY - touchEndY;
      const diffX = touchStartX - touchEndX;

      // Swipe threshold is 50px vertical, with vertical dominance
      if (Math.abs(diffY) > 50 && Math.abs(diffY) > Math.abs(diffX)) {
        const el = getSectionEl();
        if (el && sectionIsScrollable(el)) {
          const goingDown = diffY > 0;
          if (goingDown && !sectionAtBottom(el)) return;
          if (!goingDown && !sectionAtTop(el)) return;
        }
        animateTo(currentRef.current + (diffY > 0 ? 1 : -1));
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [enabled, animateTo, count]);

  return (
    <Ctx.Provider value={{ current, goTo, count, enabled }}>
      {children}

      <div ref={containerRef} className="snap-container">
        {sections.map((s, i) => {
          let zIndex = 1;
          if (target === null) {
            zIndex = i === current ? 10 : 1;
          } else {
            const isGoingDown = target > current;
            if (isGoingDown) {
              if (i === target) zIndex = 20;
              else if (i === current) zIndex = 10;
            } else {
              if (i === current) zIndex = 20;
              else if (i === target) zIndex = 10;
            }
          }

          return (
            <section
              key={sectionIds[i]}
              id={sectionIds[i]}
              className="snap-section"
              style={{
                zIndex,
                scrollbarWidth: "none",
              } as React.CSSProperties}
            >
              {s}
            </section>
          );
        })}
      </div>

      {enabled && (
        <nav
          aria-label="Section navigation"
          className="fixed right-6 top-1/2 -translate-y-1/2 z-[999] flex flex-col gap-3"
        >
          {sectionIds.map((id, i) => (
            <button
              key={id}
              aria-label={`Go to ${id}`}
              onClick={() => goTo(i)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: i === current ? "var(--accent)" : "var(--border)",
                transform: i === current ? "scale(1.25)" : "scale(1)",
              }}
            />
          ))}
        </nav>
      )}
    </Ctx.Provider>
  );
}
