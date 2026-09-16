import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hashPassword } from "../src/lib/password";

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
    await db.project.createMany({
      data: [
        {
          slug: "project-one",
          name: "Project One",
          tagline: "A short one-line pitch goes here.",
          description:
            "Replace this with a real description of what the project does, who it's for, and why it matters. A couple of sentences is plenty.",
          status: "in-progress",
          tags: "Product",
        },
        {
          slug: "project-two",
          name: "Project Two",
          tagline: "A short one-line pitch goes here.",
          description:
            "Replace this with a real description of what the project does, who it's for, and why it matters. A couple of sentences is plenty.",
          status: "concept",
          tags: "Product",
        },
        {
          slug: "project-three",
          name: "Project Three",
          tagline: "A short one-line pitch goes here.",
          description:
            "Replace this with a real description of what the project does, who it's for, and why it matters. A couple of sentences is plenty.",
          status: "archived",
          tags: "Product",
        },
      ],
    });
    console.log("Seeded placeholder projects.");
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
