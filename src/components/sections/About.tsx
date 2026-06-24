import { useState } from "react";
import { User, Terminal, Zap, MapPin, Sparkles, Rocket, type LucideIcon } from "lucide-react";
import { SectionBackdrop } from "../SectionBackdrop";
import { Reveal } from "../Reveal";

type Bubble = {
  id: string;
  label: string;
  icon: LucideIcon;
  content: string;
};

const bubbles: Bubble[] = [
  { id: "who", label: "who i am", icon: User, content: "AI Engineer based in Hyderabad specializing in LLM orchestration, conversational agents, and production backends (B.Tech CS, GPA 8.36). Bridging the gap between prototype and shipped product, I'm a multi-time national hackathon winner and recipient of ₹1 lakh innovation funding for an AI accessibility project, recognized for engineering socially impactful solutions." },
  { id: "stack", label: "my stack", icon: Terminal, content: "Python · FastAPI · React · LangChain · OpenAI / Azure OpenAI · SQLAlchemy · MySQL · Docker · APScheduler · Guardrails AI · YOLOv5 · Whisper." },
  { id: "work", label: "how i work", icon: Zap, content: "I like systems that are boring in the best way — reliable, auditable, well-scoped with a hint of AI innovation where necessary. I build with AI coding tools but own the architecture decisions." },
  { id: "where", label: "where i am", icon: MapPin, content: "Based in Hyderabad, India. Open to remote-first roles globally. Comfortable coordinating across time zones." },
  { id: "fun", label: "fun fact", icon: Sparkles, content: "I once generated over a million tokens of synthetic training data using GPT-4o and LLaMA 3 — basically making AI do its own homework." },
  { id: "want", label: "what i want", icon: Rocket, content: "To build AI products that solve real problems at production scale — not demos that die in a repo." },
];

export function About() {
  const [active, setActive] = useState<string | null>("who");
  const activeBubble = bubbles.find((b) => b.id === active);

  return (
    <div
      className="relative w-full flex items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-20"
      style={{ backgroundColor: "var(--bg2)" }}
    >
      <SectionBackdrop blobSide="left" blobColor="var(--accent3)" blobOpacity={0.1} />
      <div className="section-inner relative z-[1] w-full max-w-[1200px] mx-auto flex flex-col justify-center gap-6 md:gap-8 lg:gap-10" style={{ boxSizing: "border-box" }}>
        {/* HEADER - Centered */}
        <div className="flex flex-col gap-3 md:gap-4 text-center">
          <Reveal direction="left">
            <span className="section-eyebrow uppercase text-[11px]" style={{ color: "var(--accent)", letterSpacing: "0.18em" }}>
              About me
            </span>
          </Reveal>
          <Reveal direction="left" delay={0.05}>
            <h2
              className="section-headline font-semibold"
              style={{
                color: "var(--highlight)",
                fontSize: "clamp(18px, 3vw, 28px)",
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
              }}
            >
              I turn AI research into things that actually ship.
            </h2>
          </Reveal>
        </div>

        {/* GRID */}
        <div style={{ minHeight: "260px" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16 md:items-center items-start">
            {/* LEFT - Bubbles */}
            <div className="flex flex-col gap-4 md:gap-6 min-w-0">
              <div className="bubbles-row flex flex-wrap justify-center gap-2">
                {bubbles.map((b, i) => {
                  const Icon = b.icon;
                  const isActive = active === b.id;
                  return (
                    <Reveal key={b.id} direction="right" delay={i * 0.06}>
                      <button
                        onClick={() => setActive(b.id)}
                        className="inline-flex items-center gap-2 rounded-full transition-transform hover:scale-[1.04]"
                        style={{
                          backgroundColor: isActive
                            ? "color-mix(in oklab, var(--accent3) 60%, transparent)"
                            : "color-mix(in oklab, var(--accent3) 25%, transparent)",
                          border: `1px solid ${isActive ? "var(--accent)" : "var(--border)"}`,
                          color: isActive ? "var(--highlight)" : "var(--muted)",
                          padding: "6px 12px",
                          fontSize: "12px",
                        }}
                      >
                        <Icon size={14} />
                        {b.label}
                      </button>
                    </Reveal>
                  );
                })}
              </div>
            </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-4 md:gap-6 min-w-0">
            <Reveal direction="right" delay={0.4}>
              <div
                className="w-full"
                style={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  padding: "14px 16px",
                  minHeight: "64px",
                }}
              >
                {activeBubble ? (
                  <div className="flex flex-col gap-2">
                    <span className="uppercase text-[10px]" style={{ color: "var(--dim)", letterSpacing: "0.14em" }}>
                      {activeBubble.label}
                    </span>
                    <p className="text-[13px]" style={{ color: "var(--muted)", lineHeight: 1.7 }}>
                      {activeBubble.content}
                    </p>
                  </div>
                ) : (
                  <p className="italic text-[13px]" style={{ color: "var(--dim)" }}>
                    tap a bubble {"<-"}
                  </p>
                )}
              </div>
            </Reveal>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
