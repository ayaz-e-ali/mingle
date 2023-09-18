-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "onboarded" BOOLEAN NOT NULL DEFAULT false;
