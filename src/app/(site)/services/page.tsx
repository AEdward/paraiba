import type { Metadata } from "next";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { getPageBlocks } from "@/lib/blocks/data";

export const metadata: Metadata = {
  title: "Services",
  description: "Web, mobile, and custom software development, UI/UX design, cloud infrastructure, and system integrations.",
};

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const blocks = await getPageBlocks("services");
  return (
    <>
      {blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </>
  );
}
