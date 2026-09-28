import type { Metadata } from "next";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { getPageBlocks } from "@/lib/blocks/data";

export const metadata: Metadata = {
  title: "Resources",
  description: "Guides and resources from Paraiba Technology PLC.",
};
export const dynamic = "force-dynamic";

export default async function ResourcesPage() {
  const blocks = await getPageBlocks("resources");
  return (
    <>
      {blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </>
  );
}
