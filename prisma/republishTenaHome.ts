// One-time script to apply Tena's redesigned home-page content
// (tenaHomeBlocks.ts) — replaces only Tena's "home" ProductPage blocks;
// every other product site and page is untouched. Safe to re-run.
//
// Usage: npx tsx prisma/republishTenaHome.ts

import "dotenv/config";
import { PrismaClient, type Prisma } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { tenaHomeBlocks } from "./tenaHomeBlocks";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const db = new PrismaClient({ adapter });

async function main() {
  const site = await db.productSite.findUnique({ where: { subdomain: "tena" } });
  if (!site) {
    throw new Error('No ProductSite with subdomain "tena" found — run db:republish-product-sites first.');
  }

  const page = await db.productPage.upsert({
    where: { productSiteId_slug: { productSiteId: site.id, slug: "home" } },
    update: {},
    create: { productSiteId: site.id, slug: "home", title: "Home" },
  });

  await db.productBlock.deleteMany({ where: { productPageId: page.id } });
  await db.productBlock.createMany({
    data: tenaHomeBlocks.map((b, i) => ({
      productPageId: page.id,
      type: b.type,
      order: i,
      data: b.data as Prisma.InputJsonValue,
    })),
  });

  console.log(`Republished Tena's home page with ${tenaHomeBlocks.length} blocks.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
