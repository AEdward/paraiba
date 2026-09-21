// One-time script to apply the real uploaded logo files (public/product-logos/)
// to each Product Site's logoData — replacing the hand-coded icon-mark
// fallback in each shell's Navbar with the actual brand mark. Safe to
// re-run. Doesn't touch name/subdomain/theme colors.
//
// Usage: npx tsx prisma/republishProductLogos.ts

import "dotenv/config";
import { readFileSync } from "node:fs";
import path from "node:path";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const db = new PrismaClient({ adapter });

const LOGOS: { subdomain: string; file: string; mimeType: string }[] = [
  { subdomain: "kinin", file: "kinin.webp", mimeType: "image/webp" },
  { subdomain: "yeneta", file: "yeneta.png", mimeType: "image/png" },
  { subdomain: "tena", file: "tena.webp", mimeType: "image/webp" },
  { subdomain: "mead", file: "mead.webp", mimeType: "image/webp" },
];

async function main() {
  for (const logo of LOGOS) {
    const filePath = path.join(process.cwd(), "public", "product-logos", logo.file);
    const logoData = readFileSync(filePath);
    const site = await db.productSite.findUnique({ where: { subdomain: logo.subdomain } });
    if (!site) {
      console.warn(`Skipping "${logo.subdomain}" — no ProductSite found (run db:republish-product-sites first).`);
      continue;
    }
    await db.productSite.update({
      where: { subdomain: logo.subdomain },
      data: { logoData, logoMimeType: logo.mimeType },
    });
    console.log(`Set logo for ${logo.subdomain} (${logoData.length} bytes).`);
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
