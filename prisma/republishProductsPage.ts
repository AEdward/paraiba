// One-time script to add the closing CTA block to a database that already
// had the Products page seeded — seedPages() skips any page slug that
// already exists, so a normal re-seed won't pick up this addition. This
// replaces only the Products page's blocks (delete + recreate in order);
// every other page is untouched.
//
// Usage: npx tsx prisma/republishProductsPage.ts

import "dotenv/config";
import { PrismaClient, type Prisma } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { productsBlocks } from "./seedPages";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const db = new PrismaClient({ adapter });

async function main() {
  const page = await db.page.upsert({
    where: { slug: "products" },
    update: {},
    create: { slug: "products", title: "Products" },
  });

  await db.block.deleteMany({ where: { pageId: page.id } });
  await db.block.createMany({
    data: productsBlocks.map((b, i) => ({
      pageId: page.id,
      type: b.type,
      order: i,
      data: b.data as Prisma.InputJsonValue,
    })),
  });

  console.log(`Republished Products page with ${productsBlocks.length} blocks.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
