-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "subdomain" TEXT,
ADD COLUMN     "themeColor" TEXT,
ADD COLUMN     "themeColorSecondary" TEXT;

-- CreateTable
CREATE TABLE "ProductPage" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductBlock" (
    "id" TEXT NOT NULL,
    "productPageId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductBlock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductPage_projectId_slug_key" ON "ProductPage"("projectId", "slug");

-- CreateIndex
CREATE INDEX "ProductBlock_productPageId_order_idx" ON "ProductBlock"("productPageId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "Project_subdomain_key" ON "Project"("subdomain");

-- AddForeignKey
ALTER TABLE "ProductPage" ADD CONSTRAINT "ProductPage_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductBlock" ADD CONSTRAINT "ProductBlock_productPageId_fkey" FOREIGN KEY ("productPageId") REFERENCES "ProductPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

