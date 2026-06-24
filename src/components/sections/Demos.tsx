import { useState } from "react";
import { SectionBackdrop } from "../SectionBackdrop";
import { Reveal } from "../Reveal";

type Status = "coming-soon" | "live";

type Project = {
  title: string;
  description: string;
  tech: string[];
  status: Status;
  href?: string;
};

const projects: Project[] = [
  { title: "RAG Console", description: "Document retrieval dashboard with source tracing, prompt controls, and evaluation snapshots.", tech: ["Next.js", "Supabase", "OpenAI"], status: "coming-soon" },
  { title: "Agent Lab", description: "A playground for chaining research, planning, and execution agents into reliable product workflows.", tech: ["Python", "LangChain", "FastAPI"], status: "coming-soon" },
  { title: "Vision QA Suite", description: "Image understanding demos for structured inspection, OCR cleanup, and visual regression checks.", tech: ["YOLOv5", "React", "Vercel"], status: "coming-soon" },
  { title: "HireVision", description: "Resume and JD matching using embeddings and cosine similarity with structured prompt workflows.", tech: ["LangChain", "Ollama", "Streamlit"], status: "coming-soon" },
  { title: "Speaker Diariser", description: "Real-time speech-to-text with speaker segmentation and NLP-based sentiment classification.", tech: ["Whisper", "Python", "Scikit-learn"], status: "coming-soon" },
  { title: "Eval Monitor", description: "Lightweight observability layer for model responses, failures, costs, and quality checks.", tech: ["TypeScript", "Postgres", "Charts"], status: "coming-soon" },
];

const STAGGER = [0, 0.1, 0.15, 0.2, 0.25, 0.3];

function ProjectCard({ p }: { p: Project }) {
  const [hover, setHover] = useState(false);
  const isLive = p.status === "live";

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="demo-card relative flex flex-col gap-3 transition-all duration-300 h-full"
      style={{
        backgroundColor: "var(--card)",
        border: `0.5px solid ${hover ? "color-mix(in oklab, var(--accent) 30%, transparent)" : "var(--border)"}`,
        borderRadius: "18px",
        padding: "1.25rem",
        transform: hover ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hover ? "0 24px 50px color-mix(in srgb, var(--text) 0.45, transparent)" : "none",
      }}
    >
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 transition-opacity duration-300"
        style={{
          height: "2px",
          borderTopLeftRadius: "18px",
          borderTopRightRadius: "18px",
          background: "linear-gradient(90deg, var(--accent), var(--accent2), var(--accent3))",
          opacity: hover ? 1 : 0,
        }}
      />

      <div className="flex items-center justify-between">
        {isLive ? (
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1"
            style={{
              backgroundColor: "color-mix(in srgb, var(--success) 0.1, transparent)",
              border: "1px solid color-mix(in srgb, var(--success) 0.3, transparent)",
              color: "var(--success)",
              fontSize: "10px",
            }}
          >
            <span className="pulse-dot inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--success)" }} />
            Live
          </span>
        ) : (
          <span
            className="rounded-full px-2.5 py-1 uppercase"
            style={{
              backgroundColor: "color-mix(in oklab, var(--accent3) 15%, transparent)",
              border: "1px solid var(--accent3)",
              color: "var(--muted)",
              fontSize: "10px",
              letterSpacing: "0.1em",
            }}
          >
            Coming soon
          </span>
        )}
      </div>

      <h3 className="font-semibold" style={{ color: "var(--highlight)", fontSize: "16px" }}>
        {p.title}
      </h3>
      <p className="text-[12px]" style={{ color: "var(--muted)", lineHeight: 1.7 }}>
        {p.description}
      </p>

      <div className="flex flex-wrap gap-1.5 pt-1">
        {p.tech.map((t) => (
          <span
            key={t}
            className="rounded-full px-2 py-0.5"
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              color: "var(--accent)",
              fontSize: "10px",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-3">
        {isLive && p.href ? (
          <a href={p.href} className="text-[12px] font-semibold" style={{ color: "var(--accent)" }}>
            View demo →
          </a>
        ) : (
          <span className="text-[12px]" style={{ color: "var(--dim)", cursor: "default" }}>
            Coming soon →
          </span>
        )}
      </div>
    </article>
  );
}

export function Demos({ page = 1 }: { page?: number }) {
  const displayedProjects = page === 1 ? projects.slice(0, 3) : projects.slice(3, 6);

  return (
    <div
      className="relative w-full flex items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-20"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <SectionBackdrop blobSide="right" blobColor="var(--accent)" blobOpacity={0.07} />
      <div className="section-inner relative z-[1] w-full max-w-[1200px] mx-auto flex flex-col justify-center gap-6 md:gap-8" style={{ boxSizing: "border-box" }}>
        <div className="flex flex-col gap-3">
          <Reveal>
            <span className="section-eyebrow uppercase text-[11px]" style={{ color: "var(--accent)", letterSpacing: "0.18em" }}>
              Demo gallery {page > 1 ? `· Page ${page}` : ""}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="section-headline font-semibold"
              style={{
                color: "var(--highlight)",
                fontSize: "clamp(18px, 3vw, 28px)",
                letterSpacing: "-0.01em",
              }}
            >
              {page === 1 ? "Applied AI builds." : "More from the lab."}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[13px] max-w-xl" style={{ color: "var(--muted)" }}>
              {page === 1 ? (
                <span>
                  A growing collection of shipped experiments.{" "}
                  <span className="hidden lg:inline">More projects below.</span>
                  <span className="lg:hidden">Swipe to view more.</span>
                </span>
              ) : (
                "Observability, diarization, and evaluation dashboards."
              )}
            </p>
          </Reveal>
        </div>

        <div className="demo-card-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {displayedProjects.map((p, i) => (
            <Reveal key={p.title} delay={STAGGER[i] ?? 0.3} className="h-full">
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
