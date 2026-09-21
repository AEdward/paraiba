// One-time script to apply Mead's redesigned home-page content
// (meadHomeBlocks.ts) — replaces only Mead's "home" ProductPage blocks;
// every other product site and page is untouched. Safe to re-run.
//
// Usage: npx tsx prisma/republishMeadHome.ts

import "dotenv/config";
import { PrismaClient, type Prisma } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { meadHomeBlocks } from "./meadHomeBlocks";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const db = new PrismaClient({ adapter });

async function main() {
  const site = await db.productSite.findUnique({ where: { subdomain: "mead" } });
  if (!site) {
    throw new Error('No ProductSite with subdomain "mead" found — run db:republish-product-sites first.');
  }

  const page = await db.productPage.upsert({
    where: { productSiteId_slug: { productSiteId: site.id, slug: "home" } },
    update: {},
    create: { productSiteId: site.id, slug: "home", title: "Home" },
  });

  await db.productBlock.deleteMany({ where: { productPageId: page.id } });
  await db.productBlock.createMany({
    data: meadHomeBlocks.map((b, i) => ({
      productPageId: page.id,
      type: b.type,
      order: i,
      data: b.data as Prisma.InputJsonValue,
    })),
  });

  console.log(`Republished Mead's home page with ${meadHomeBlocks.length} blocks.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
