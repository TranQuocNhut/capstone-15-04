/*
  Warnings:

  - Added the required column `provider` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storagePath` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "provider" TEXT NOT NULL,
ADD COLUMN     "storagePath" TEXT NOT NULL;
