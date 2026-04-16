-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_imageId_fkey";

-- DropForeignKey
ALTER TABLE "Save" DROP CONSTRAINT "Save_imageId_fkey";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("imageId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Save" ADD CONSTRAINT "Save_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("imageId") ON DELETE CASCADE ON UPDATE CASCADE;
