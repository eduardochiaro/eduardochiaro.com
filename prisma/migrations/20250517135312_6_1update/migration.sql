-- DropForeignKey
ALTER TABLE `App` DROP FOREIGN KEY `App_fileId_fkey`;

-- DropForeignKey
ALTER TABLE `Book` DROP FOREIGN KEY `Book_fileId_fkey`;

-- DropForeignKey
ALTER TABLE `Resume` DROP FOREIGN KEY `Resume_fileId_fkey`;

-- DropForeignKey
ALTER TABLE `ResumeProject` DROP FOREIGN KEY `ResumeProject_fileId_fkey`;

-- DropIndex
DROP INDEX `App_fileId_fkey` ON `App`;

-- DropIndex
DROP INDEX `Book_fileId_fkey` ON `Book`;

-- DropIndex
DROP INDEX `Resume_fileId_fkey` ON `Resume`;

-- DropIndex
DROP INDEX `ResumeProject_fileId_fkey` ON `ResumeProject`;

-- AddForeignKey
ALTER TABLE `App` ADD CONSTRAINT `App_fileId_fkey` FOREIGN KEY (`fileId`) REFERENCES `File`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Resume` ADD CONSTRAINT `Resume_fileId_fkey` FOREIGN KEY (`fileId`) REFERENCES `File`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResumeProject` ADD CONSTRAINT `ResumeProject_fileId_fkey` FOREIGN KEY (`fileId`) REFERENCES `File`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_fileId_fkey` FOREIGN KEY (`fileId`) REFERENCES `File`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
