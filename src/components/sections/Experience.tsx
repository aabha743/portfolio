import { SectionBackdrop } from "../SectionBackdrop";
import { Reveal } from "../Reveal";

type Job = {
  company: string;
  date: string;
  role: string;
  bullets: string[];
};

const jobs: Job[] = [
  {
    company: "Bradsol",
    date: "Apr 2026 – Jun 2026",
    role: "Forward Deployed Engineer",
    bullets: [
      "Shipped a full-stack lease management platform for a charitable medical device network operating across multiple centers in India — asset tracking, lease lifecycles, OTP auth, and role-based access for field staff.",
      "Architected a 19-table MySQL schema with JWT + RBAC, APScheduler SMS reminders, QR-based asset scanning, and audit logging — production-deployed on cPanel + VPS.",
    ],
  },
  {
    company: "FewShotPrep",
    date: "Dec 2024 – Jun 2025",
    role: "AI Associate Cloud Engineer",
    bullets: [
      "Built production conversational AI agents for cloud engineering workflows — LLM-powered, guardrailed for output quality, and designed to handle real user interactions without hallucinating or going off-script.",
      "Generated a 1M+ token synthetic JSONL training dataset using GPT-4o and LLaMA 3, feeding model fine-tuning and evaluation pipelines from scratch",
    ],
  },
  {
    company: "Atomstate",
    date: "May 2023 – Nov 2023",
    role: "AI/ML Trainee",
    bullets: [
      "Deployed a real-time political sentiment analysis system scraping and processing 500+ news sources via Azure OpenAI APIs — 82% prediction accuracy in production.",
      "Built a multilingual NLP translation pipeline that improved downstream model accuracy by 35% and pushed client adoption to 95% — making the product usable across language barriers for the first time.",
    ],
  },
  {
    company: "KG Reddy College",
    date: "Oct 2022 – Jun 2023",
    role: "Project Intern",
    bullets: [
      "Built an AI meeting summarisation tool on Whisper AI that cut manual note-taking time by 60% — adopted internally with 90% transcription accuracy on real meeting audio.",
      "Developed KGR-Code, a web-based Python and Java assessment platform that went live across the college with 250+ students and faculty using it for coding evaluations.",
    ],
  },
];

function JobCard({ job }: { job: Job }) {
  return (
    <div
      className="experience-card h-full flex flex-col"
      style={{
        backgroundColor: "var(--card)",
        border: "0.5px solid var(--border)",
        borderRadius: "14px",
        padding: "16px 20px",
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
        <span className="font-semibold text-[14px]" style={{ color: "var(--highlight)" }}>
          {job.company}
        </span>
        <span className="text-[11px]" style={{ color: "var(--dim)" }}>
          {job.date}
        </span>
      </div>
      <div className="text-[12px] mb-3" style={{ color: "var(--accent)" }}>
        {job.role}
      </div>
      <ul className="flex flex-col gap-2">
        {job.bullets.map((b, i) => (
          <li key={i} className="text-[12px]" style={{ color: "var(--muted)", lineHeight: 1.7 }}>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Experience({ page = 1 }: { page?: number }) {
  const displayedJobs = page === 1 ? jobs.slice(0, 2) : jobs.slice(2, 4);

  return (
    <div
      className="relative w-full flex items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-20"
      style={{ backgroundColor: "var(--bg2)" }}
    >
      <SectionBackdrop blobSide="right" blobColor="var(--accent3)" blobOpacity={0.09} />
      <div className="section-inner relative z-[1] w-full max-w-[1200px] mx-auto flex flex-col justify-center gap-6 md:gap-8" style={{ boxSizing: "border-box" }}>
        <div className="flex flex-col gap-3">
          <Reveal>
            <span className="section-eyebrow uppercase text-[11px]" style={{ color: "var(--accent)", letterSpacing: "0.18em" }}>
              Experience {page > 1 ? `· Page ${page}` : ""}
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
              {page === 1 ? "Where I've shipped." : "Earlier work."}
            </h2>
          </Reveal>
        </div>

        <div className="experience-stack grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
          {displayedJobs.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.1} className="h-full">
              <JobCard job={job} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
