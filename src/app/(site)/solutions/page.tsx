import type { Metadata } from "next";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { getPageBlocks } from "@/lib/blocks/data";

export const metadata: Metadata = {
  title: "Solutions",
  description: "Dedicated, industry-specific software for education, healthcare, pharmacy, restaurants, and hospitality.",
};

export const dynamic = "force-dynamic";

export default async function SolutionsPage() {
  const blocks = await getPageBlocks("solutions");
  return (
    <>
      {blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </>
  );
}
