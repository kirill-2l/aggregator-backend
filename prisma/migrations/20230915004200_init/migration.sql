-- AddForeignKey
ALTER TABLE "parseSource" ADD CONSTRAINT "parseSource_parseSourceTypeId_fkey" FOREIGN KEY ("parseSourceTypeId") REFERENCES "parseSourceType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
