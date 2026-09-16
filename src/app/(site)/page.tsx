import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { getPageBlocks } from "@/lib/blocks/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const blocks = await getPageBlocks("home");
  return (
    <>
      {blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </>
  );
}
