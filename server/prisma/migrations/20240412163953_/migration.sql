/*
  Warnings:

  - You are about to drop the column `rent` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "rent",
ADD COLUMN     "rent_amount" INTEGER DEFAULT 0,
ADD COLUMN     "rent_rate" INTEGER DEFAULT 0;

-- CreateTable
CREATE TABLE "Rent_Instance" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Rent_Instance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rent_Instance" ADD CONSTRAINT "Rent_Instance_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rent_Instance" ADD CONSTRAINT "Rent_Instance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
