-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "link" TEXT,
    "screenshot" TEXT,
    "embedLive" BOOLEAN NOT NULL DEFAULT false,
    "githubRepo" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "deliverables" TEXT,
    "caseStudy" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Project" ("createdAt", "description", "embedLive", "githubRepo", "id", "link", "name", "screenshot", "slug", "status", "tagline", "tags", "updatedAt") SELECT "createdAt", "description", "embedLive", "githubRepo", "id", "link", "name", "screenshot", "slug", "status", "tagline", "tags", "updatedAt" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
