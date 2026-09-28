import type { Metadata } from "next";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { getPageBlocks } from "@/lib/blocks/data";

export const metadata: Metadata = {
  title: "Our Work",
  description: "Case studies and projects delivered by Paraiba Technology PLC.",
};
export const dynamic = "force-dynamic";

export default async function WorkPage() {
  const blocks = await getPageBlocks("work");
  return (
    <>
      {blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </>
  );
}
