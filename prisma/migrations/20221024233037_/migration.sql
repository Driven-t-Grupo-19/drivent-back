/*
  Warnings:

  - Added the required column `acommodation` to the `purchases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "purchases" ADD COLUMN     "acommodation" BOOLEAN NOT NULL;
