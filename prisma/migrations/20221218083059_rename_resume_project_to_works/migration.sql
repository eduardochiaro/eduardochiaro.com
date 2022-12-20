/*
  Warnings:

  - You are about to drop the `resume_works` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `resume_works` DROP FOREIGN KEY `resume_works_resume_id_fkey`;

-- DropTable
DROP TABLE `resume_works`;

-- CreateTable
CREATE TABLE `resume_projects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `logo` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,
    `resume_id` INTEGER NOT NULL,

    INDEX `resume_projects_resume_id_fkey`(`resume_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `resume_projects` ADD CONSTRAINT `resume_projects_resume_id_fkey` FOREIGN KEY (`resume_id`) REFERENCES `resume`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
