/*
  Warnings:

  - You are about to drop the `Rent_Instance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Rent_Instance" DROP CONSTRAINT "Rent_Instance_productId_fkey";

-- DropForeignKey
ALTER TABLE "Rent_Instance" DROP CONSTRAINT "Rent_Instance_userId_fkey";

-- DropTable
DROP TABLE "Rent_Instance";

-- CreateTable
CREATE TABLE "rent_instance" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "rent_instance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rent_instance" ADD CONSTRAINT "rent_instance_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rent_instance" ADD CONSTRAINT "rent_instance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
