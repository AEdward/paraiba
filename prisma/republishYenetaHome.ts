// One-time script to apply Yeneta's redesigned home-page content
// (yenetaHomeBlocks.ts) — replaces only Yeneta's "home" ProductPage blocks;
// every other product site and page is untouched. Safe to re-run.
//
// Usage: npx tsx prisma/republishYenetaHome.ts

import "dotenv/config";
import { PrismaClient, type Prisma } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { yenetaHomeBlocks } from "./yenetaHomeBlocks";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const db = new PrismaClient({ adapter });

async function main() {
  const site = await db.productSite.findUnique({ where: { subdomain: "yeneta" } });
  if (!site) {
    throw new Error('No ProductSite with subdomain "yeneta" found — run db:republish-product-sites first.');
  }

  const page = await db.productPage.upsert({
    where: { productSiteId_slug: { productSiteId: site.id, slug: "home" } },
    update: {},
    create: { productSiteId: site.id, slug: "home", title: "Home" },
  });

  await db.productBlock.deleteMany({ where: { productPageId: page.id } });
  await db.productBlock.createMany({
    data: yenetaHomeBlocks.map((b, i) => ({
      productPageId: page.id,
      type: b.type,
      order: i,
      data: b.data as Prisma.InputJsonValue,
    })),
  });

  console.log(`Republished Yeneta's home page with ${yenetaHomeBlocks.length} blocks.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
