import { FadeIn } from "@/components/FadeIn";
import { TiltCard } from "@/components/TiltCard";
import { DeviceMockup } from "@/components/DeviceMockup";
import { LiveBrowserPreview } from "@/components/LiveBrowserPreview";
import { SectionShell, Eyebrow } from "./SectionShell";
import { getEmbedLabel, getEmbedUrl, getShowcaseGradient, statusColor, type Project } from "@/lib/projects";
import type { LiveDemoData } from "@/lib/blocks/types";

export function LiveDemoBlock({ data, project }: { data: LiveDemoData; project?: Project }) {
  if (!project) return null;

  const embedUrl = getEmbedUrl(project);

  return (
    <SectionShell theme={data.theme}>
      <FadeIn>
        <Eyebrow color={data.theme === "dark" ? "var(--color-amber)" : "var(--color-ember)"}>
          {data.eyebrow}
        </Eyebrow>
        {data.heading && (
          <h2 className="font-display mt-4 text-3xl font-bold" style={{ color: "var(--ink)" }}>
            {data.heading}
          </h2>
        )}
        {data.body && <p className="mt-4 max-w-xl opacity-65">{data.body}</p>}
      </FadeIn>
      <FadeIn delay={0.1}>
        <div className="mt-10">
          {embedUrl ? (
            <LiveBrowserPreview url={embedUrl} label={getEmbedLabel(project)} />
          ) : (
            <TiltCard className="rounded-3xl" glowColor={statusColor[project.status]}>
              <DeviceMockup gradient={getShowcaseGradient(project.slug)} screenshot={project.screenshot} />
            </TiltCard>
          )}
        </div>
      </FadeIn>
    </SectionShell>
  );
}
