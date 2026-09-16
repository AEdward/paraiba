type LogoProps = {
  size?: number;
  withWordmark?: boolean;
  className?: string;
};

export function LogoMark({ size = 48, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Paraiba Technology PLC mark — the crystalline P"
    >
      <defs>
        <linearGradient id="paraiba-crystal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#16CFC0" />
          <stop offset="50%" stopColor="#08DCE8" />
          <stop offset="100%" stopColor="#087CFF" />
        </linearGradient>
        <linearGradient id="paraiba-crystal-deep" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#087CFF" />
          <stop offset="100%" stopColor="#073B8F" />
        </linearGradient>
      </defs>
      <g stroke="#061426" strokeWidth="1.5" strokeLinejoin="round">
        {/* Faceted P stem */}
        <path d="M60,30 L60,170 L88,170 L88,116 L88,30 Z" fill="url(#paraiba-crystal-deep)" />
        {/* Faceted P bowl */}
        <path
          d="M88,30 L134,30 C156,30 168,48 168,70 C168,92 156,108 134,108 L88,108 Z"
          fill="url(#paraiba-crystal)"
        />
        {/* Inner facet cuts */}
        <path d="M88,30 L120,52 L88,70 Z" fill="#F5FAFF" opacity="0.35" />
        <path d="M120,52 L146,50 L134,80 L88,70 Z" fill="#08DCE8" opacity="0.55" />
        <path d="M134,80 L146,50 L168,70 C168,92 156,108 134,108 Z" opacity="0.85" fill="url(#paraiba-crystal-deep)" />
        <path d="M60,116 L88,116 L88,170 L60,170 Z" fill="#073B8F" opacity="0.9" />
      </g>
    </svg>
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
