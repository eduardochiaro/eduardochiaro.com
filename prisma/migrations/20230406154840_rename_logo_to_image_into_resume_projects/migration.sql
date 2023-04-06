/*
  Warnings:

  - You are about to drop the column `logo` on the `resume_projects` table. All the data in the column will be lost.
  - Added the required column `image` to the `resume_projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `resume_projects` DROP COLUMN `logo`,
    ADD COLUMN `image` VARCHAR(191) NOT NULL;
