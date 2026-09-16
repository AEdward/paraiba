export function GradientMesh({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      <div
        className="absolute -top-1/4 -left-1/4 h-[60%] w-[60%] rounded-full blur-3xl motion-safe:animate-[drift_22s_ease-in-out_infinite]"
        style={{ background: "radial-gradient(circle, var(--color-amber) 0%, transparent 70%)", opacity: 0.22 }}
      />
      <div
        className="absolute top-1/3 -right-1/4 h-[55%] w-[55%] rounded-full blur-3xl motion-safe:animate-[drift_26s_ease-in-out_infinite_reverse]"
        style={{ background: "radial-gradient(circle, var(--color-teal) 0%, transparent 70%)", opacity: 0.2 }}
      />
      <div
        className="absolute -bottom-1/4 left-1/3 h-[50%] w-[50%] rounded-full blur-3xl motion-safe:animate-[drift_30s_ease-in-out_infinite]"
        style={{ background: "radial-gradient(circle, var(--color-ember) 0%, transparent 70%)", opacity: 0.16 }}
      />
    </div>
  );
}
