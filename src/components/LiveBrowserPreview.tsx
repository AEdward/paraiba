"use client";

import { useEffect, useRef, useState } from "react";

// A fixed, standard desktop viewport that gets scaled to fit the panel,
// rather than a blind multiplier of the panel's own width — that either
// under-shoots (site falls back to its compressed mobile layout on a narrow
// panel) or over-shoots (site renders correctly but centered in a sea of
// empty margin, since its design width is much narrower than the virtual
// viewport). 16:9 at 1440px wide is a reasonable "normal desktop" target.
const VIEWPORT_WIDTH = 1440;
const VIEWPORT_HEIGHT = 900;

export function LiveBrowserPreview({ url, label }: { url: string; label?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setScale(Math.min(1, entry.contentRect.width / VIEWPORT_WIDTH));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="overflow-hidden rounded-2xl border shadow-[0_1px_2px_rgba(22,35,63,0.04),0_24px_40px_-14px_rgba(22,35,63,0.28)]"
      style={{ borderColor: "var(--border-soft)" }}
    >
      <div
        className="flex items-center gap-3 border-b px-4 py-3"
        style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
      >
        <span className="flex shrink-0 gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--color-ember)" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--color-amber)" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--color-teal)" }} />
        </span>
        <span
          className="flex-1 truncate rounded-md px-3 py-1 text-xs opacity-60"
          style={{ background: "var(--background)", color: "var(--foreground)" }}
        >
          {label ?? url}
        </span>
      </div>
      <div ref={containerRef} className="aspect-[16/10] overflow-hidden bg-black">
        <iframe
          src={url}
          title="Live preview"
          loading="lazy"
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          style={{
            width: VIEWPORT_WIDTH,
            height: VIEWPORT_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            border: 0,
          }}
        />
      </div>
    </div>
  );
}
