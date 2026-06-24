export function Placeholder({ title }: { title: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center px-6 py-20">
      <div className="text-center">
        <h2
          className="text-3xl md:text-5xl font-semibold mb-3"
          style={{ color: "var(--highlight)" }}
        >
          {title}
        </h2>
        <p className="text-[14px]" style={{ color: "var(--muted)" }}>
          Coming soon.
        </p>
      </div>
    </div>
  );
}
