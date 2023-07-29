/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `apps` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `bookmarks` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `menu_links` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `resume` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `resume_projects` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `skills` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `apps` DROP COLUMN `deleted_at`;

-- AlterTable
ALTER TABLE `bookmarks` DROP COLUMN `deleted_at`;

-- AlterTable
ALTER TABLE `menu_links` DROP COLUMN `deleted_at`;

-- AlterTable
ALTER TABLE `resume` DROP COLUMN `deleted_at`;

-- AlterTable
ALTER TABLE `resume_projects` DROP COLUMN `deleted_at`;

-- AlterTable
ALTER TABLE `skills` DROP COLUMN `deleted_at`;

-- AddForeignKey
ALTER TABLE `user_access` ADD CONSTRAINT `user_access_email_fkey` FOREIGN KEY (`email`) REFERENCES `users`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
