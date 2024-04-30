/*
  Warnings:

  - You are about to drop the column `orderId` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `customerName` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `payment` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `paymentId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `service` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `service` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `customer` DROP FOREIGN KEY `Customer_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `service` DROP FOREIGN KEY `Service_orderId_fkey`;

-- DropIndex
DROP INDEX `Customer_id_key` ON `customer`;

-- DropIndex
DROP INDEX `Order_customerId_key` ON `order`;

-- DropIndex
DROP INDEX `Order_id_key` ON `order`;

-- DropIndex
DROP INDEX `Order_paymentId_key` ON `order`;

-- DropIndex
DROP INDEX `Order_serviceId_key` ON `order`;

-- DropIndex
DROP INDEX `Payment_id_key` ON `payment`;

-- DropIndex
DROP INDEX `Service_id_key` ON `service`;

-- AlterTable
ALTER TABLE `customer` DROP COLUMN `orderId`,
    ALTER COLUMN `id` DROP DEFAULT;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `customerName`,
    DROP COLUMN `payment`,
    DROP COLUMN `paymentId`,
    DROP COLUMN `service`,
    DROP COLUMN `serviceId`,
    ALTER COLUMN `id` DROP DEFAULT;

-- AlterTable
ALTER TABLE `payment` DROP COLUMN `orderId`,
    ALTER COLUMN `id` DROP DEFAULT;

-- AlterTable
ALTER TABLE `service` DROP COLUMN `orderId`,
    ALTER COLUMN `id` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
