// One-time script to seed real partner entries with their uploaded logo
// files (public/partners/). Upserts by name, so it's safe to re-run —
// website URLs can be added later by editing the name/website match here
// and re-running, or directly via /admin/partners.
//
// Usage: npx tsx prisma/republishPartners.ts

import "dotenv/config";
import { readFileSync } from "node:fs";
import path from "node:path";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const db = new PrismaClient({ adapter });

const PARTNERS: { name: string; file: string; mimeType: string; website: string | null; order: number }[] = [
  { name: "ASF Agro Industry", file: "asf-agro-industry.png", mimeType: "image/png", website: null, order: 1 },
  { name: "Smart Business Group PLC", file: "smart-business-group.png", mimeType: "image/png", website: null, order: 2 },
  { name: "Miran Grand Hotel", file: "miran-grand-hotel.png", mimeType: "image/png", website: null, order: 3 },
  { name: "DreamSpace Realty Business Group", file: "dreamspace-realty.png", mimeType: "image/png", website: null, order: 4 },
];

async function main() {
  for (const partner of PARTNERS) {
    const filePath = path.join(process.cwd(), "public", "partners", partner.file);
    const logoData = readFileSync(filePath);
    const existing = await db.partner.findFirst({ where: { name: partner.name } });
    if (existing) {
      await db.partner.update({
        where: { id: existing.id },
        data: { logoData, logoMimeType: partner.mimeType, website: partner.website, order: partner.order },
      });
      console.log(`Updated ${partner.name} (${logoData.length} bytes).`);
    } else {
      await db.partner.create({
        data: {
          name: partner.name,
          logoData,
          logoMimeType: partner.mimeType,
          website: partner.website,
          order: partner.order,
        },
      });
      console.log(`Created ${partner.name} (${logoData.length} bytes).`);
    }
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
