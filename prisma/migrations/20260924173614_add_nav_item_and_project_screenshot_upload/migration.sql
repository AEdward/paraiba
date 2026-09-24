-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "screenshotData" BYTEA,
ADD COLUMN     "screenshotMimeType" TEXT;

-- CreateTable
CREATE TABLE "NavItem" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "location" TEXT NOT NULL DEFAULT 'both',
    "group" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "newTab" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NavItem_pkey" PRIMARY KEY ("id")
);
