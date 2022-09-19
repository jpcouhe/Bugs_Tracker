-- DropForeignKey
ALTER TABLE `contribution` DROP FOREIGN KEY `Contribution_projectId_fkey`;

-- AddForeignKey
ALTER TABLE `Contribution` ADD CONSTRAINT `Contribution_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
