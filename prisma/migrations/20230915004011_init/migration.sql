/*
  Warnings:

  - You are about to drop the column `parseSourceTypeType` on the `parseSource` table. All the data in the column will be lost.
  - You are about to drop the column `parseSourceId` on the `parseSourceType` table. All the data in the column will be lost.
  - Added the required column `parseSourceTypeId` to the `parseSource` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "parseSourceType" DROP CONSTRAINT "parseSourceType_parseSourceId_fkey";

-- AlterTable
ALTER TABLE "parseSource" DROP COLUMN "parseSourceTypeType",
ADD COLUMN     "parseSourceTypeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "parseSourceType" DROP COLUMN "parseSourceId";

-- AddForeignKey
ALTER TABLE "parseSource" ADD CONSTRAINT "parseSource_parseSourceTypeId_fkey" FOREIGN KEY ("parseSourceTypeId") REFERENCES "parseSourceType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
