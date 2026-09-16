import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const jobId = String(body?.jobId ?? "").trim();
  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const phone = String(body?.phone ?? "").trim();
  const coverLetter = String(body?.coverLetter ?? "").trim();
  const resumeUrl = String(body?.resumeUrl ?? "").trim();

  if (!jobId || !name || !email) {
    return NextResponse.json(
      { error: "Job, name, and email are required." },
      { status: 400 },
    );
  }

  const job = await db.jobPosting.findUnique({ where: { id: jobId } });
  if (!job) {
    return NextResponse.json({ error: "This job posting no longer exists." }, { status: 404 });
  }

  await db.jobApplication.create({
    data: {
      jobId,
      name,
      email,
      phone: phone || null,
      coverLetter: coverLetter || null,
      resumeUrl: resumeUrl || null,
    },
  });

  return NextResponse.json({ ok: true });
}
