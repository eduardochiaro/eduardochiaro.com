/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `resume_tags` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `resume_tags_name_key` ON `resume_tags`(`name`);
