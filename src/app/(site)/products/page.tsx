import type { Metadata } from "next";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { getPageBlocks } from "@/lib/blocks/data";

export const metadata: Metadata = {
  title: "Products",
  description: "The products Paraiba Technology PLC is building.",
};

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const blocks = await getPageBlocks("products");
  return (
    <>
      {blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </>
  );
}
