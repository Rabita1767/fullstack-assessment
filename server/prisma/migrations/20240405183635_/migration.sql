/*
  Warnings:

  - You are about to drop the `Category_Product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category_Product" DROP CONSTRAINT "Category_Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Category_Product" DROP CONSTRAINT "Category_Product_productId_fkey";

-- DropTable
DROP TABLE "Category_Product";

-- CreateTable
CREATE TABLE "category_product" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "category_product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "category_product" ADD CONSTRAINT "category_product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_product" ADD CONSTRAINT "category_product_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
