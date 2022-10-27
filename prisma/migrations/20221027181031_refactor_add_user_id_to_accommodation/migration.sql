-- AlterTable
ALTER TABLE "accommodations" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "accommodations" ADD CONSTRAINT "accommodations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
