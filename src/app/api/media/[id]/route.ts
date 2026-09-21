import { db } from "@/lib/db";

// Uploaded media assets are immutable (a new upload creates a new row, see
// resolveMediaRef() in lib/blocks/formData.ts), so unlike the versioned
// product-site/partner logo routes, this can cache forever unconditionally.
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const asset = await db.mediaAsset.findUnique({
    where: { id },
    select: { data: true, mimeType: true },
  });

  if (!asset) {
    return new Response(null, { status: 404 });
  }

  return new Response(new Uint8Array(asset.data), {
    headers: {
      "Content-Type": asset.mimeType || "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
