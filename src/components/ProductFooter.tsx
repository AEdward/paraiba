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
    <footer className="paraiba-light-section border-t" style={{ borderColor: "var(--border-soft)" }}>
      <div
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-8 text-sm"
        style={{ color: "#000000" }}
      >
        <span className="inline-flex items-center gap-2.5 font-semibold">
          {logoUrl && (
            <Image src={logoUrl} alt="" width={40} height={40} style={{ objectFit: "contain" }} unoptimized />
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
