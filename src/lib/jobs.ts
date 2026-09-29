import { db } from "@/lib/db";

export async function getOpenJobs() {
  return db.jobPosting.findMany({
    where: { status: "open" },
    orderBy: { createdAt: "desc" },
  });
}

export async function getOpenJob(id: string) {
  return db.jobPosting.findFirst({ where: { id, status: "open" } });
}
