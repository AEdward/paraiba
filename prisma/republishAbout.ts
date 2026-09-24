// One-time script to add the 3D logo visual to a database that already had
// the About page seeded — seedPages() skips any page slug that already
// exists, so a normal re-seed won't pick up this change. This replaces only
// the About page's blocks (delete + recreate in order); every other page is
// untouched.
//
// Usage: npx tsx prisma/republishAbout.ts

import "dotenv/config";
import { PrismaClient, type Prisma } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { aboutBlocks } from "./seedPages";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const db = new PrismaClient({ adapter });

async function main() {
  const page = await db.page.upsert({
    where: { slug: "about" },
    update: {},
    create: { slug: "about", title: "About" },
  });

  await db.block.deleteMany({ where: { pageId: page.id } });
  await db.block.createMany({
    data: aboutBlocks.map((b, i) => ({
      pageId: page.id,
      type: b.type,
      order: i,
      data: b.data as Prisma.InputJsonValue,
    })),
  });

  console.log(`Republished About page with ${aboutBlocks.length} blocks.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
