import { useSnap } from "../SnapScroll";
import { StatRow } from "../StatCounter";
import { ProfileCard } from "../ProfileCard";
import { SectionBackdrop } from "../SectionBackdrop";
import { Reveal } from "../Reveal";

export function Hero({ sectionIds }: { sectionIds: string[] }) {
  const { goTo } = useSnap();
  const nav = (id: string) => {
    const i = sectionIds.indexOf(id);
    if (i >= 0) goTo(i);
  };

  return (
    <div className="relative w-full flex items-center pt-4 pb-4 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <SectionBackdrop blobSide="right" blobColor="var(--accent)" blobOpacity={0.09} />
      <div className="section-inner relative z-[1] w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[55%_45%] gap-6 md:gap-8 lg:gap-10 xl:gap-12 items-center">
        <div className="flex flex-col gap-4 md:gap-6 min-w-0">
          <Reveal>
            <div
              className="inline-flex items-center gap-2 self-start rounded-full px-3 py-1.5 text-[11px]"
              style={{
                backgroundColor: "color-mix(in srgb, var(--success) 0.08, transparent)",
                border: "1px solid color-mix(in srgb, var(--success) 0.25, transparent)",
                color: "var(--success)",
              }}
            >
              <span
                className="pulse-dot inline-block w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "var(--success)" }}
              />
              Available for freelance work
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h2
              className="hero-headline font-semibold"
              style={{
                fontSize: "clamp(1.75rem, 8vw, 5rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
              }}
            >
              <span className="block" style={{ color: "var(--highlight)" }}>
                ABHA BOOB
              </span>
              <span className="block" style={{ color: "var(--accent)", fontSize: "0.9em" }}>
                AI ENGINEER
              </span>
            </h2>
          </Reveal>
          
          <Reveal delay={0.1}>
            <p
              className="max-w-[480px] text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              I build LLM pipelines, agents, and production backends — and ship them as tools people actually use.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => nav("contact")}
                className="text-[13px] font-semibold rounded-full px-4 sm:px-5 py-3 transition-transform hover:scale-[1.02] w-full sm:w-auto"
                style={{ backgroundColor: "var(--highlight)", color: "var(--bg)" }}
              >
                Start a project →
              </button>
              <button
                onClick={() => nav("demos")}
                className="text-[13px] font-semibold rounded-full px-4 sm:px-5 py-3 w-full sm:w-auto"
                style={{
                  border: "1px solid var(--accent)",
                  color: "var(--accent)",
                  backgroundColor: "transparent",
                }}
              >
                View demos
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <StatRow />
          </Reveal>
        </div>

        <div id="hero-card-slot" className="block">
          <Reveal delay={0.15} direction="right">
            <ProfileCard />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
