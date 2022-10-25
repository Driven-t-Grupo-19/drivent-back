/*
  Warnings:

  - You are about to drop the column `hotel` on the `purchases` table. All the data in the column will be lost.
  - You are about to drop the column `room` on the `purchases` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "purchases" DROP COLUMN "hotel",
DROP COLUMN "room";
