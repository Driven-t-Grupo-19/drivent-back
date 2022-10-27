/*
  Warnings:

  - You are about to drop the `acommodations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "acommodations" DROP CONSTRAINT "acommodations_hotelId_fkey";

-- DropTable
DROP TABLE "acommodations";

-- CreateTable
CREATE TABLE "accommodations" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "type" "AcommodationTypes" NOT NULL DEFAULT E'SINGLE',
    "isOccupied" BOOLEAN NOT NULL DEFAULT false,
    "hotelId" INTEGER NOT NULL,

    CONSTRAINT "accommodations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "accommodations" ADD CONSTRAINT "accommodations_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
