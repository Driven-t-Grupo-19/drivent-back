-- AlterTable
ALTER TABLE "acommodations" ADD COLUMN     "slots" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "userId" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "acommodations" ADD CONSTRAINT "acommodations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
