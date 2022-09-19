/*
  Warnings:

  - The primary key for the `contribution` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `postId` on the `contribution` table. All the data in the column will be lost.
  - Added the required column `projectId` to the `Contribution` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `contribution` DROP FOREIGN KEY `Contribution_postId_fkey`;

-- AlterTable
ALTER TABLE `contribution` DROP PRIMARY KEY,
    DROP COLUMN `postId`,
    ADD COLUMN `projectId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`userId`, `projectId`);

-- AddForeignKey
ALTER TABLE `Contribution` ADD CONSTRAINT `Contribution_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Projects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
