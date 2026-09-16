import Image from "next/image";

type LogoProps = {
  size?: number;
  withWordmark?: boolean;
  className?: string;
};

export function LogoMark({ size = 48, className }: { size?: number; className?: string }) {
  return (
    <Image
      src="/paraiba-symbol.png"
      alt="Paraiba Technology PLC mark — the crystalline P"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: "contain" }}
      priority
    />
  );
}

export function Logo({ size = 48, withWordmark = true, className }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <LogoMark size={size} />
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className="font-display font-bold tracking-wide"
            style={{ color: "var(--ink)", fontSize: size * 0.42 }}
          >
            PARAIBA
          </span>
          <span
            className="text-[10px] font-semibold tracking-[0.25em] mt-1"
            style={{ color: "var(--color-ember)" }}
          >
            TECHNOLOGY PLC
          </span>
        </span>
      )}
    </span>
  );
}
