/*
  Warnings:

  - A unique constraint covering the columns `[codRef]` on the table `properties` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codRef` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "properties" ADD COLUMN     "codRef" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "properties_codRef_key" ON "properties"("codRef");
