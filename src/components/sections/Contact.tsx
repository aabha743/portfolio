import { Linkedin, Github } from "lucide-react";
import { SectionBackdrop } from "../SectionBackdrop";
import { Reveal } from "../Reveal";

const contactLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/abha-b-ai",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/aabha743",
    icon: Github,
  },
];

const footerLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/abha-b-ai" },
  { label: "GitHub", href: "https://github.com/aabha743" },
  { label: "Email", href: "https://mail.google.com/mail/?view=cm&fs=1&to=abhaboob8@gmail.com" },
];

export function Contact() {
  return (
    <div
      id="contact"
      className="relative w-full flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-20"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <SectionBackdrop blobSide="left" blobColor="var(--accent)" blobOpacity={0.08} />
      {/* Radial glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle 700px at 50% 50%, color-mix(in srgb, var(--accent) 0.08, transparent), transparent)",
          zIndex: 0,
        }}
      />

      {/* Main content — centered vertically */}
      <div className="relative z-[1] flex-1 flex flex-col items-center justify-center">
        <Reveal>
        <div className="section-inner flex flex-col items-center text-center justify-center gap-4 md:gap-6 max-w-[1200px] w-full" style={{ boxSizing: "border-box" }}>
          {/* Eyebrow with flanking lines */}
          <div className="section-eyebrow flex items-center gap-3">
            <span
              className="inline-block h-[1px] w-6"
              style={{ backgroundColor: "var(--border)" }}
            />
            <span
              className="uppercase text-[11px]"
              style={{ color: "var(--accent)", letterSpacing: "0.18em" }}
            >
              Get in touch
            </span>
            <span
              className="inline-block h-[1px] w-6"
              style={{ backgroundColor: "var(--border)" }}
            />
          </div>

          {/* Headline — responsive */}
          <h2
            className="section-headline font-semibold md:text-[clamp(2.5rem,6vw,4rem)]"
            style={{
              color: "var(--highlight)",
              fontSize: "clamp(1.75rem, 9vw, 2.25rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          >
            Have a project in mind?
          </h2>

          {/* Subtext */}
          <p
            className="text-[14px] max-w-[440px]"
            style={{ color: "var(--muted)", lineHeight: 1.7 }}
          >
            AI pipelines, automation systems, or a full LLM-powered product — I'd love to hear about it. Based in Hyderabad, working globally.
          </p>

          {/* Availability strip */}
          <div
            className="flex items-center justify-center text-[12px] px-4 py-3"
            style={{
              backgroundColor: "color-mix(in srgb, var(--accent) 0.05, transparent)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              color: "var(--muted)",
            }}
          >
            <span className="inline-flex items-center gap-2">
              <span
                className="pulse-dot inline-block w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "var(--accent)" }}
              />
              Available now · Responds in &lt; 24 hrs · Remote-friendly
            </span>
          </div>

          {/* Primary CTA */}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=abhaboob8@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center text-[14px] font-semibold transition-transform hover:scale-[1.03] w-full sm:w-auto"
            style={{
              backgroundColor: "var(--highlight)",
              color: "var(--bg)",
              borderRadius: "10px",
              padding: "14px 32px",
            }}
          >
            Email me →
          </a>

          {/* Contact link pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {contactLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 rounded-full transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    color: "var(--muted)",
                    padding: "8px 16px",
                    fontSize: "12px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.color = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = "var(--muted)";
                  }}
                >
                  <Icon size={14} />
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
        </Reveal>
      </div>

      {/* Footer */}
      <footer
        className="relative z-10 mt-8 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 sm:gap-0 text-[11px]"
        style={{
          color: "var(--muted)",
          borderTop: "0.5px solid var(--border)",
          paddingTop: "1.5rem",
        }}
      >
        <span>&copy; 2026 Abha Boob — AI Engineer, Hyderabad</span>

        <span className="inline-flex items-center gap-2">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "var(--accent)" }}
          />
          Open to work
        </span>

        <div className="flex items-center gap-4">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="transition-colors hover:underline"
              style={{ color: "var(--muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
            >
              {link.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
