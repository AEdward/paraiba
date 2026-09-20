import { db } from "@/lib/db";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const site = await db.productSite.findUnique({
    where: { id },
    select: { logoData: true, logoMimeType: true },
  });

  if (!site?.logoData) {
    return new Response(null, { status: 404 });
  }

  return new Response(new Uint8Array(site.logoData), {
    headers: {
      "Content-Type": site.logoMimeType || "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
