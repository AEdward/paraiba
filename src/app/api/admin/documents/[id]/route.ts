import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

// Applicant-uploaded documents may contain personal data, so unlike the
// public /api/media route this always requires an admin session.
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return new Response(null, { status: 401 });

  const { id } = await params;
  const doc = await db.applicationDocument.findUnique({
    where: { id },
    select: { data: true, mimeType: true, fileName: true },
  });

  if (!doc) return new Response(null, { status: 404 });

  return new Response(new Uint8Array(doc.data), {
    headers: {
      "Content-Type": doc.mimeType || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${doc.fileName.replace(/"/g, "")}"`,
    },
  });
}
