import { db } from "@/lib/db";

export async function getPartners() {
  return db.partner.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
}
