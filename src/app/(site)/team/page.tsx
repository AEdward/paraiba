import type { Metadata } from "next";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { getPageBlocks } from "@/lib/blocks/data";

export const metadata: Metadata = { title: "Leadership & Team" };
export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const blocks = await getPageBlocks("team");
  return (
    <>
      {blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </>
  );
}
