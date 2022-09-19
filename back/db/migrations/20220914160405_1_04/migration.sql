/*
  Warnings:

  - You are about to drop the column `roleId` on the `comment` table. All the data in the column will be lost.
  - Added the required column `ticketId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_roleId_fkey`;

-- AlterTable
ALTER TABLE `comment` DROP COLUMN `roleId`,
    ADD COLUMN `ticketId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `ticket` ADD COLUMN `description` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
