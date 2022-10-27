-- CreateEnum
CREATE TYPE "AcommodationTypes" AS ENUM ('SINGLE', 'DOUBLE', 'TRIPLE');

-- CreateTable
CREATE TABLE "hotels" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "hotelPicture" TEXT NOT NULL,

    CONSTRAINT "hotels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "acommodations" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "type" "AcommodationTypes" NOT NULL DEFAULT E'SINGLE',
    "isOccupied" BOOLEAN NOT NULL DEFAULT false,
    "hotelId" INTEGER NOT NULL,

    CONSTRAINT "acommodations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "acommodations" ADD CONSTRAINT "acommodations_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
