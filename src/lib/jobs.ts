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

export function splitLines(value: string | null): string[] {
  return value ? value.split("\n").map((line) => line.trim()).filter(Boolean) : [];
}

export function splitTags(value: string | null): string[] {
  return value ? value.split(",").map((tag) => tag.trim()).filter(Boolean) : [];
}
