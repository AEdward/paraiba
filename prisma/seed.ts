import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hashPassword } from "../src/lib/password";
import { seedPages } from "./seedPages";
import { productCatalog } from "./productCatalog";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const db = new PrismaClient({ adapter });

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const name = process.env.ADMIN_NAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !name || !password) {
    throw new Error(
      "ADMIN_EMAIL, ADMIN_NAME, and ADMIN_PASSWORD must be set in .env before seeding.",
    );
  }

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin user ${email} already exists, skipping.`);
  } else {
    await db.user.create({
      data: { email, name, passwordHash: await hashPassword(password) },
    });
    console.log(`Created admin user ${email}.`);
  }

  const projectCount = await db.project.count();
  if (projectCount === 0) {
    await db.project.createMany({ data: productCatalog });
    console.log("Seeded product catalog.");
  }

  await seedPages(db);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
