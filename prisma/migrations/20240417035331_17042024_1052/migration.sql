/*
  Warnings:

  - Added the required column `service` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `service` VARCHAR(191) NOT NULL;
