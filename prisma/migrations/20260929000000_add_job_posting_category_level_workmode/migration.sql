-- AlterTable
ALTER TABLE "JobPosting" ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'Engineering',
ADD COLUMN     "level" TEXT NOT NULL DEFAULT 'Mid',
ADD COLUMN     "workMode" TEXT NOT NULL DEFAULT 'On-site';
