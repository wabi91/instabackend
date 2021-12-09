/*
  Warnings:

  - A unique constraint covering the columns `[tag]` on the table `HashTag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "HashTag_tag_key" ON "HashTag"("tag");
