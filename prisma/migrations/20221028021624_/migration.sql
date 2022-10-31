/*
  Warnings:

  - You are about to drop the column `userId` on the `accommodations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "accommodations" DROP COLUMN "userId",
ADD COLUMN     "users" INTEGER[];
