import { useEffect, useRef, useState, createElement, type CSSProperties, type ElementType, type ReactNode } from "react";

type Direction = "up" | "left" | "right";

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  as = "div",
  className,
  style,
}: {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            obs.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const offset =
    direction === "left" ? "translate3d(-20px,0,0)"
    : direction === "right" ? "translate3d(20px,0,0)"
    : "translate3d(0,20px,0)";

  const combined: CSSProperties = {
    opacity: shown ? 1 : 0,
    transform: shown ? "translate3d(0,0,0)" : offset,
    transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
    willChange: "opacity, transform",
    ...style,
  };

  return createElement(as, { ref, className, style: combined }, children);
}
