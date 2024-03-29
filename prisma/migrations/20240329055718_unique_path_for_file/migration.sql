/*
  Warnings:

  - A unique constraint covering the columns `[path]` on the table `files` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `files_path_key` ON `files`(`path`);
