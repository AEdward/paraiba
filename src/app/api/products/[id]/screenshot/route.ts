import { db } from "@/lib/db";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await db.project.findUnique({
    where: { id },
    select: { screenshotData: true, screenshotMimeType: true },
  });

  if (!project?.screenshotData) {
    return new Response(null, { status: 404 });
  }

  return new Response(new Uint8Array(project.screenshotData), {
    headers: {
      "Content-Type": project.screenshotMimeType || "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
