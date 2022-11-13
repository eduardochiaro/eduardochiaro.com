/*
  Warnings:

  - You are about to drop the column `special` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `style` on the `jobs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `jobs` DROP COLUMN `special`,
    DROP COLUMN `style`;
