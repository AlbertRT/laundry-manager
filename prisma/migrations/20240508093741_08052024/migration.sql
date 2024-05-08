/*
  Warnings:

  - You are about to drop the column `quantity` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `service` on the `order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `quantity`,
    DROP COLUMN `service`,
    ADD COLUMN `inv` VARCHAR(191) NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE `OrderItem` (
    `id` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `serviceId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `defaultPrice` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `unit` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
