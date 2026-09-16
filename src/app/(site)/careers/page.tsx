import type { Metadata } from "next";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { getPageBlocks } from "@/lib/blocks/data";

export const metadata: Metadata = {
  title: "Careers",
  description: "Build technology with Ethiopian brilliance at Paraiba Technology PLC.",
};

export const dynamic = "force-dynamic";

export default async function CareersPage() {
  const blocks = await getPageBlocks("careers");
  return (
    <>
      {blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </>
  );
}
