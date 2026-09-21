// One-time script for a database that was already seeded with the old
// "Project One/Two/Three" placeholders: removes those placeholders and
// upserts the real product catalog (prisma/productCatalog.ts). Safe to
// re-run — upsert by slug means it won't duplicate products, and it never
// touches any other product you've already added by hand.
//
// Usage: npx tsx prisma/republishProducts.ts

import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { productCatalog } from "./productCatalog";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const db = new PrismaClient({ adapter });

const PLACEHOLDER_SLUGS = ["project-one", "project-two", "project-three"];

async function main() {
  const { count } = await db.project.deleteMany({ where: { slug: { in: PLACEHOLDER_SLUGS } } });
  if (count > 0) console.log(`Removed ${count} placeholder product(s).`);

  for (const product of productCatalog) {
    await db.project.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }
  console.log(`Upserted ${productCatalog.length} products: ${productCatalog.map((p) => p.name).join(", ")}.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
