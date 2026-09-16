import { db } from "@/lib/db";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const partner = await db.partner.findUnique({
    where: { id },
    select: { logoData: true, logoMimeType: true },
  });

  if (!partner?.logoData) {
    return new Response(null, { status: 404 });
  }

  return new Response(new Uint8Array(partner.logoData), {
    headers: {
      "Content-Type": partner.logoMimeType || "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
