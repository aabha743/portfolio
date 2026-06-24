type Props = {
  blobSide?: "left" | "right";
  blobColor?: string;
  blobOpacity?: number;
};

export function SectionBackdrop({
  blobSide = "left",
  blobColor = "var(--accent)",
  blobOpacity = 0.08,
}: Props) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* faint grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in srgb, var(--accent) 0.018, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--accent) 0.018, transparent) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      {/* radial glow blob */}
      <div
        className="absolute rounded-full"
        style={{
          width: "640px",
          height: "640px",
          [blobSide]: "-180px",
          top: "20%",
          background: `radial-gradient(circle, ${blobColor} 0%, transparent 70%)`,
          opacity: blobOpacity,
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}
