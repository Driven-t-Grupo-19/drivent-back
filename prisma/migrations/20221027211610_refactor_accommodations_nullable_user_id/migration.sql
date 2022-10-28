-- DropForeignKey
ALTER TABLE "accommodations" DROP CONSTRAINT "accommodations_userId_fkey";

-- AlterTable
ALTER TABLE "accommodations" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "userId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "accommodations" ADD CONSTRAINT "accommodations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
