import { db } from "@/lib/db";

export async function getOpenJobs() {
  return db.jobPosting.findMany({
    where: { status: "open" },
    orderBy: { createdAt: "desc" },
  });
}
