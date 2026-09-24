import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const MAX_FILE_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function isAllowedFile(file: File): boolean {
  return ALLOWED_TYPES.has(file.type) || file.type.startsWith("image/");
}

export async function POST(request: Request) {
  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const jobId = String(formData.get("jobId") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const coverLetter = String(formData.get("coverLetter") ?? "").trim();

  if (!jobId || !name || !email) {
    return NextResponse.json(
      { error: "Job, name, and email are required." },
      { status: 400 },
    );
  }

  const files = formData.getAll("documents").filter((f): f is File => f instanceof File && f.size > 0);
  for (const file of files) {
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json({ error: `"${file.name}" is larger than 8MB.` }, { status: 400 });
    }
    if (!isAllowedFile(file)) {
      return NextResponse.json(
        { error: `"${file.name}" must be a PDF, Word document, or image.` },
        { status: 400 },
      );
    }
  }

  const job = await db.jobPosting.findUnique({ where: { id: jobId } });
  if (!job) {
    return NextResponse.json({ error: "This job posting no longer exists." }, { status: 404 });
  }

  const documents = await Promise.all(
    files.map(async (file) => ({
      fileName: file.name,
      mimeType: file.type || "application/octet-stream",
      data: new Uint8Array(await file.arrayBuffer()),
    })),
  );

  await db.jobApplication.create({
    data: {
      jobId,
      name,
      email,
      phone: phone || null,
      coverLetter: coverLetter || null,
      documents: { create: documents },
    },
  });

  return NextResponse.json({ ok: true });
}
