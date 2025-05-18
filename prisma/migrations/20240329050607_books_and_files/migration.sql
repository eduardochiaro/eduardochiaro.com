/*
  Warnings:

  - You are about to drop the column `image` on the `apps` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `resume` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `resume_projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `apps` DROP COLUMN `image`,
    ADD COLUMN `file_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `resume` DROP COLUMN `image`,
    ADD COLUMN `file_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `resume_projects` DROP COLUMN `image`,
    ADD COLUMN `file_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `books` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NULL,
    `file_id` INTEGER NULL,
    `isbn` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `books_isbn_key`(`isbn`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `files` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `apps` ADD CONSTRAINT `apps_file_id_fkey` FOREIGN KEY (`file_id`) REFERENCES `files`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resume` ADD CONSTRAINT `resume_file_id_fkey` FOREIGN KEY (`file_id`) REFERENCES `files`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resume_projects` ADD CONSTRAINT `resume_projects_file_id_fkey` FOREIGN KEY (`file_id`) REFERENCES `files`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `books` ADD CONSTRAINT `books_file_id_fkey` FOREIGN KEY (`file_id`) REFERENCES `files`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
