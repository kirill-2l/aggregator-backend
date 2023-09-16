/*
  Warnings:

  - You are about to drop the `parseSource` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `parseSourceType` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[password]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hash` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "parseSource" DROP CONSTRAINT "parseSource_parseSourceTypeId_fkey";

-- DropForeignKey
ALTER TABLE "parseSource" DROP CONSTRAINT "parseSource_userId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "hash" TEXT NOT NULL,
ADD COLUMN     "hashedRt" TEXT,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "parseSource";

-- DropTable
DROP TABLE "parseSourceType";

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");
