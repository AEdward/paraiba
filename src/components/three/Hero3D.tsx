"use client";

import dynamic from "next/dynamic";
import { LogoMark } from "@/components/Logo";

const HeroScene = dynamic(() => import("./HeroScene").then((mod) => mod.HeroScene), {
  ssr: false,
  loading: () => <HeroFallback />,
});

function HeroFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center opacity-30">
      <LogoMark size={280} />
    </div>
  );
}

export function Hero3D() {
  return (
    <div className="h-[320px] w-full cursor-grab touch-none active:cursor-grabbing sm:h-[420px] lg:h-[480px]">
      <HeroScene />
    </div>
  );
}
