/*
  Warnings:

  - You are about to drop the column `logo` on the `resume` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `resume` DROP COLUMN `logo`,
    ADD COLUMN `image` VARCHAR(191) NULL;
