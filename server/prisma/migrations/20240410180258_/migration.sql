/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `category_product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "category_product_productId_key" ON "category_product"("productId");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
