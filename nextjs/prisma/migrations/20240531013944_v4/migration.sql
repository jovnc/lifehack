/*
  Warnings:

  - The primary key for the `Ingredient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `productId` on the `Ingredient` table. All the data in the column will be lost.
  - The `id` column on the `Ingredient` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_productId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_id_fkey";

-- AlterTable
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_pkey",
DROP COLUMN "productId",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE TEXT,
ADD CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Transaction";

-- CreateTable
CREATE TABLE "ProductIngredients" (
    "productId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,

    CONSTRAINT "ProductIngredients_pkey" PRIMARY KEY ("productId","ingredientId")
);

-- CreateTable
CREATE TABLE "_ProductIngredients" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductIngredients_AB_unique" ON "_ProductIngredients"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductIngredients_B_index" ON "_ProductIngredients"("B");

-- AddForeignKey
ALTER TABLE "ProductIngredients" ADD CONSTRAINT "ProductIngredients_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductIngredients" ADD CONSTRAINT "ProductIngredients_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductIngredients" ADD CONSTRAINT "_ProductIngredients_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductIngredients" ADD CONSTRAINT "_ProductIngredients_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
