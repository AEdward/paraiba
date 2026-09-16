import type { Metadata } from "next";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { getPageBlocks } from "@/lib/blocks/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Paraiba Technology PLC.",
};

export const dynamic = "force-dynamic";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role } = await searchParams;
  const initialMessage = role ? `I'm interested in the ${role} position.\n\n` : "";
  const blocks = await getPageBlocks("contact");

  return (
    <>
      {blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} contactInitialMessage={initialMessage} />
      ))}
    </>
  );
}
