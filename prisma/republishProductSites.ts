// One-time script that creates/updates the Product Sites from brand style
// boards (prisma/productSitesCatalog.ts). Safe to re-run — upsert by
// subdomain means it won't duplicate sites, and it never touches the logo
// fields, so uploading a real logo from /admin/product-sites/[id] afterward
// is never overwritten by a re-run.
//
// Usage: npx tsx prisma/republishProductSites.ts

import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { productSitesCatalog } from "./productSitesCatalog";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const db = new PrismaClient({ adapter });

async function main() {
  for (const site of productSitesCatalog) {
    await db.productSite.upsert({
      where: { subdomain: site.subdomain },
      update: {
        name: site.name,
        themeColor: site.themeColor,
        themeColorSecondary: site.themeColorSecondary,
      },
      create: site,
    });
  }
  console.log(
    `Upserted ${productSitesCatalog.length} product sites: ${productSitesCatalog.map((s) => s.name).join(", ")}.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
