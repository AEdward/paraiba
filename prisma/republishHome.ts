// One-time script to apply the new Home page composition to a database
// that was already seeded — seedPages() skips any page slug that already
// exists, so a normal re-seed won't pick up changes to homeBlocks. This
// replaces only the Home page's blocks (delete + recreate in order); every
// other page is untouched.
//
// Usage: npx tsx prisma/republishHome.ts

import "dotenv/config";
import { PrismaClient, type Prisma } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { homeBlocks } from "./seedPages";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const db = new PrismaClient({ adapter });

async function main() {
  const page = await db.page.upsert({
    where: { slug: "home" },
    update: {},
    create: { slug: "home", title: "Home" },
  });

  await db.block.deleteMany({ where: { pageId: page.id } });
  await db.block.createMany({
    data: homeBlocks.map((b, i) => ({
      pageId: page.id,
      type: b.type,
      order: i,
      data: b.data as Prisma.InputJsonValue,
    })),
  });

  console.log(`Republished Home page with ${homeBlocks.length} blocks.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
