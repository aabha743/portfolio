import { createFileRoute } from "@tanstack/react-router";
import { SnapScroll } from "@/components/SnapScroll";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Demos } from "@/components/sections/Demos";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Abha Boob — AI Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Abha Boob — AI Engineer building LLM pipelines, agents, and production backends.",
      },
      { property: "og:title", content: "Abha Boob — AI Engineer" },
      {
        property: "og:description",
        content: "Portfolio of Abha Boob — AI Engineer building LLM pipelines, agents, and production backends.",
      },
    ],
  }),
  component: Index,
});

const sectionIds = [
  "hero",
  "about",
  "demos",
  "demos-2",
  "experience",
  "experience-2",
  "contact",
];

function Index() {
  const sections = [
    <Hero key="hero" sectionIds={sectionIds} />,
    <About key="about" />,
    <Demos key="demos-1" page={1} />,
    <Demos key="demos-2" page={2} />,
    <Experience key="experience-1" page={1} />,
    <Experience key="experience-2" page={2} />,
    <Contact key="contact" />,
  ];

  return (
    <main style={{ backgroundColor: "var(--bg)" }}>
      <SnapScroll sections={sections} sectionIds={sectionIds}>
        <Nav sectionIds={sectionIds} />
      </SnapScroll>
    </main>
  );
}
