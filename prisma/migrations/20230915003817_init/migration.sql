/*
  Warnings:

  - You are about to drop the column `name` on the `parseSource` table. All the data in the column will be lost.
  - Added the required column `parseSourceTypeType` to the `parseSource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "parseSource" DROP COLUMN "name",
ADD COLUMN     "parseSourceTypeType" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "parseSourceType" (
    "type" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "parseSourceId" INTEGER,

    CONSTRAINT "parseSourceType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "parseSourceType_type_key" ON "parseSourceType"("type");

-- AddForeignKey
ALTER TABLE "parseSourceType" ADD CONSTRAINT "parseSourceType_parseSourceId_fkey" FOREIGN KEY ("parseSourceId") REFERENCES "parseSource"("id") ON DELETE SET NULL ON UPDATE CASCADE;
