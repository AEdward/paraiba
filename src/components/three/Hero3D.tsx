"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

const HeroScene = dynamic(() => import("./HeroScene").then((mod) => mod.HeroScene), {
  ssr: false,
  loading: () => <HeroFallback />,
});

function HeroFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center opacity-40">
      <Image
        src="/paraiba-logo-full.png"
        alt="Paraiba Technology PLC — crystalline P emblem and wordmark"
        width={937}
        height={616}
        className="h-auto w-full"
      />
    </div>
  );
}

export function Hero3D() {
  return (
    <div className="h-[300px] w-full cursor-grab touch-none active:cursor-grabbing sm:h-[380px] lg:h-[420px]">
      <HeroScene />
    </div>
  );
}
