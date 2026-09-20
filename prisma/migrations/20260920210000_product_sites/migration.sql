-- DropForeignKey
ALTER TABLE "ProductPage" DROP CONSTRAINT "ProductPage_projectId_fkey";

-- DropIndex
DROP INDEX "ProductPage_projectId_slug_key";

-- DropIndex
DROP INDEX "Project_subdomain_key";

-- AlterTable
ALTER TABLE "ProductPage" DROP COLUMN "projectId",
ADD COLUMN     "productSiteId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "logoUrl",
DROP COLUMN "subdomain",
DROP COLUMN "themeColor",
DROP COLUMN "themeColorSecondary";

-- CreateTable
CREATE TABLE "ProductSite" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subdomain" TEXT NOT NULL,
    "logoUrl" TEXT,
    "logoData" BYTEA,
    "logoMimeType" TEXT,
    "themeColor" TEXT,
    "themeColorSecondary" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductSite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductSite_subdomain_key" ON "ProductSite"("subdomain");

-- CreateIndex
CREATE UNIQUE INDEX "ProductPage_productSiteId_slug_key" ON "ProductPage"("productSiteId", "slug");

-- AddForeignKey
ALTER TABLE "ProductPage" ADD CONSTRAINT "ProductPage_productSiteId_fkey" FOREIGN KEY ("productSiteId") REFERENCES "ProductSite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

