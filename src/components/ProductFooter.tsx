import Image from "next/image";

export function ProductFooter({
  name,
  logoUrl,
  homeUrl,
}: {
  name: string;
  logoUrl?: string;
  homeUrl: string;
}) {
  return (
    <footer className="paraiba-dark-section border-t" style={{ borderColor: "var(--border-soft)" }}>
      <div
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-8 text-sm"
        style={{ color: "var(--foreground)" }}
      >
        <span className="inline-flex items-center gap-2.5 font-semibold">
          {logoUrl && (
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg p-1" style={{ background: "#ffffff" }}>
              <Image src={logoUrl} alt="" width={24} height={24} style={{ objectFit: "contain", width: "100%", height: "100%" }} unoptimized />
            </span>
          )}
          © {new Date().getFullYear()} {name}.
        </span>
        <a href={homeUrl} className="opacity-75 hover:opacity-100">
          Built by Paraiba Technology PLC
        </a>
      </div>
    </footer>
  );
}
