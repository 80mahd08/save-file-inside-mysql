/*
  Warnings:

  - You are about to drop the column `blob` on the `file` table. All the data in the column will be lost.
  - Added the required column `data` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filename` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimetype` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `file` DROP COLUMN `blob`,
    ADD COLUMN `data` LONGBLOB NOT NULL,
    ADD COLUMN `filename` VARCHAR(191) NOT NULL,
    ADD COLUMN `mimetype` VARCHAR(191) NOT NULL;
