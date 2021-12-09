/*
  Warnings:

  - You are about to drop the `HashTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_HashTagToPhoto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_HashTagToPhoto" DROP CONSTRAINT "_HashTagToPhoto_A_fkey";

-- DropForeignKey
ALTER TABLE "_HashTagToPhoto" DROP CONSTRAINT "_HashTagToPhoto_B_fkey";

-- DropTable
DROP TABLE "HashTag";

-- DropTable
DROP TABLE "_HashTagToPhoto";

-- CreateTable
CREATE TABLE "Hashtag" (
    "id" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hashtag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_HashtagToPhoto" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Hashtag_tag_key" ON "Hashtag"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "_HashtagToPhoto_AB_unique" ON "_HashtagToPhoto"("A", "B");

-- CreateIndex
CREATE INDEX "_HashtagToPhoto_B_index" ON "_HashtagToPhoto"("B");

-- AddForeignKey
ALTER TABLE "_HashtagToPhoto" ADD FOREIGN KEY ("A") REFERENCES "Hashtag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HashtagToPhoto" ADD FOREIGN KEY ("B") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
