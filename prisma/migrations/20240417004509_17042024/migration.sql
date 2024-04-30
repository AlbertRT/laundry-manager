/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderId]` on the table `Service` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_customerId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_paymentId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_serviceId_fkey`;

-- AlterTable
ALTER TABLE `customer` ADD COLUMN `orderId` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `order` MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'onProgress';

-- AlterTable
ALTER TABLE `payment` ADD COLUMN `orderId` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `service` ADD COLUMN `orderId` VARCHAR(191) NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX `Customer_orderId_key` ON `Customer`(`orderId`);

-- CreateIndex
CREATE UNIQUE INDEX `Payment_orderId_key` ON `Payment`(`orderId`);

-- CreateIndex
CREATE UNIQUE INDEX `Service_orderId_key` ON `Service`(`orderId`);

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
