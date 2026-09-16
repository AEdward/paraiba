"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";

export function TiltCard({
  children,
  className,
  glowColor = "var(--color-teal)",
}: {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 12;
    const rotateX = (0.5 - y) * 12;
    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    el.style.setProperty("--glow-x", `${x * 100}%`);
    el.style.setProperty("--glow-y", `${y * 100}%`);
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group/tilt relative transition-transform duration-200 ease-out will-change-transform ${className ?? ""}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        style={{
          background: `radial-gradient(320px circle at var(--glow-x, 50%) var(--glow-y, 50%), ${glowColor}2e, transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}
