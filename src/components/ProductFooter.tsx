export function ProductFooter({ name }: { name: string }) {
  return (
    <footer className="border-t" style={{ borderColor: "var(--border-soft)" }}>
      <div
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-8 text-xs opacity-60"
        style={{ color: "var(--foreground)" }}
      >
        <span>
          © {new Date().getFullYear()} {name}.
        </span>
        <a href="https://paraiba.com" className="hover:opacity-100">
          Built by Paraiba Technology PLC
        </a>
      </div>
    </footer>
  );
}
