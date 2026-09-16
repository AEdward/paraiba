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
      aria-label="Meskeday Technologies Group mark — the Adey Circuit"
    >
      <defs>
        <linearGradient id="adey-warm" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F4B942" />
          <stop offset="100%" stopColor="#C1562E" />
        </linearGradient>
        <linearGradient id="adey-cool" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2E8C86" />
          <stop offset="100%" stopColor="#16233F" />
        </linearGradient>
      </defs>
      <g stroke="#16233F" strokeWidth="2" opacity="0.55">
        <line x1="100" y1="100" x2="100" y2="20" />
        <line x1="100" y1="100" x2="169.3" y2="60" />
        <line x1="100" y1="100" x2="169.3" y2="140" />
        <line x1="100" y1="100" x2="100" y2="180" />
        <line x1="100" y1="100" x2="30.7" y2="140" />
        <line x1="100" y1="100" x2="30.7" y2="60" />
      </g>
      <path d="M100,82 L83.6,54.9 L100,20 L116.4,54.9 Z" fill="url(#adey-warm)" />
      <path d="M115.6,91 L130.9,63.2 L169.3,60 L147.3,91.6 Z" fill="url(#adey-cool)" />
      <path d="M115.6,109 L147.3,108.4 L169.3,140 L130.9,136.8 Z" fill="url(#adey-warm)" />
      <path d="M100,118 L116.4,145.1 L100,180 L83.6,145.1 Z" fill="url(#adey-cool)" />
      <path d="M84.4,109 L69.1,136.8 L30.7,140 L52.7,108.4 Z" fill="url(#adey-warm)" />
      <path d="M84.4,91 L52.7,91.6 L30.7,60 L69.1,63.2 Z" fill="url(#adey-cool)" />
      <g fill="#FAF5EC" stroke="#16233F" strokeWidth="2.5">
        <circle cx="100" cy="20" r="5" />
        <circle cx="169.3" cy="60" r="5" />
        <circle cx="169.3" cy="140" r="5" />
        <circle cx="100" cy="180" r="5" />
        <circle cx="30.7" cy="140" r="5" />
        <circle cx="30.7" cy="60" r="5" />
      </g>
      <circle cx="100" cy="100" r="12" fill="#16233F" />
      <circle cx="100" cy="100" r="4" fill="#F4B942" />
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
            MESKEDAY
          </span>
          <span
            className="text-[10px] font-semibold tracking-[0.25em] mt-1"
            style={{ color: "var(--color-ember)" }}
          >
            TECHNOLOGIES GROUP
          </span>
        </span>
      )}
    </span>
  );
}
