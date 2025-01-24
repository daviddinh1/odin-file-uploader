-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "folderId" INTEGER NOT NULL,
    "filename" TEXT NOT NULL,
    "size" INTEGER NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
