import { LogoMark } from "@/components/Logo";

function PlaceholderScreen() {
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      style={{ background: "linear-gradient(160deg, #1c2b4a 0%, #16233F 100%)" }}
    >
      <div className="opacity-25">
        <LogoMark size={64} />
      </div>
    </div>
  );
}

function Screen({ screenshot, label }: { screenshot?: string; label?: string }) {
  if (screenshot) {
    // A screen reader that already heard the laptop's description doesn't
    // need the phone mockup (same screenshot) announced a second time.
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={screenshot} alt={label ? `${label} screenshot` : ""} className="h-full w-full object-cover object-top" />;
  }
  return <PlaceholderScreen />;
}

export function DeviceMockup({ gradient, screenshot, label }: { gradient: string; screenshot?: string; label: string }) {
  return (
    <div
      className="relative overflow-hidden rounded-3xl px-8 py-16 sm:px-16 sm:py-20"
      style={{ background: gradient }}
    >
      <div
        className="relative mx-auto flex max-w-md items-end justify-center"
        style={{ perspective: "1400px" }}
      >
        {/* Laptop */}
        <div
          className="w-full"
          style={{ transform: "rotateY(10deg) rotateX(2deg)", transformStyle: "preserve-3d" }}
        >
          <div className="rounded-t-xl border-[6px] border-b-0 border-neutral-900 bg-neutral-900 shadow-2xl">
            <div className="aspect-[16/10] overflow-hidden rounded-sm bg-black">
              <Screen screenshot={screenshot} label={label} />
            </div>
          </div>
          <div className="relative h-3 rounded-b-md bg-neutral-800 shadow-xl">
            <div className="absolute left-1/2 h-1 w-14 -translate-x-1/2 rounded-b-sm bg-neutral-950" />
          </div>
        </div>

        {/* Phone, overlapping bottom-right */}
        <div
          className="absolute -right-4 -bottom-10 w-[30%] sm:-right-8"
          style={{ transform: "rotateY(-8deg) rotateZ(2deg)", transformStyle: "preserve-3d" }}
        >
          <div className="aspect-[9/19.5] overflow-hidden rounded-[1.4rem] border-[5px] border-neutral-900 bg-neutral-900 shadow-2xl">
            <div className="relative h-full w-full overflow-hidden rounded-[1rem] bg-black">
              <Screen screenshot={screenshot} />
              <div className="absolute top-0 left-1/2 h-3 w-10 -translate-x-1/2 rounded-b-lg bg-neutral-900" />
            </div>
          </div>
        </div>
      </div>

      {!screenshot && (
        <p
          className="relative mt-8 text-center text-xs font-medium tracking-wide opacity-60"
          style={{ color: "var(--color-cream)" }}
        >
          Preview coming soon
        </p>
      )}
    </div>
  );
}
