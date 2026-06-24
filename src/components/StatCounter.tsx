import { useEffect, useRef, useState } from "react";

export function StatCounter({
  target,
  suffix = "",
  label,
  duration = 1200,
}: {
  target: number;
  suffix?: string;
  label: string;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              setValue(Math.round(target * eased));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            obs.disconnect();
          }
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <span
        className="font-semibold"
        style={{ color: "var(--highlight)", fontSize: "28px", lineHeight: 1 }}
      >
        {value}
        {suffix}
      </span>
      <span
        className="uppercase"
        style={{
          color: "var(--dim)",
          fontSize: "10px",
          letterSpacing: "0.12em",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export function StatRow() {
  return (
    <div
      className="grid grid-cols-3 gap-4 sm:flex sm:flex-row sm:gap-0 sm:items-stretch pt-2"
    >
      <StatCounter target={19} label="table schema shipped" />
      <div
        className="hidden sm:block mx-6"
        style={{ width: "1px", backgroundColor: "var(--border)" }}
      />
      <StatCounter target={1} suffix="M+" label="tokens generated" />
      <div
        className="hidden sm:block mx-6"
        style={{ width: "1px", backgroundColor: "var(--border)" }}
      />
      <StatCounter target={4} suffix=" yrs" label="years building AI" />
    </div>
  );
}
