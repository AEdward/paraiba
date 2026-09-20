import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { getProjectBySubdomain } from "@/lib/projects-data";
import { getProductPageBlocks } from "@/lib/blocks/data";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}): Promise<Metadata> {
  const { subdomain } = await params;
  const project = await getProjectBySubdomain(subdomain);
  // A product's mini-site is meant to feel independent — an absolute title
  // skips the root layout's "%s — Paraiba Technology PLC" template.
  return project ? { title: { absolute: project.name }, description: project.tagline } : {};
}

export default async function ProductHomePage({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const project = await getProjectBySubdomain(subdomain);
  if (!project) notFound();

  const blocks = await getProductPageBlocks(project.id, "home");

  return (
    <>
      {blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} project={project} />
      ))}
    </>
  );
}
