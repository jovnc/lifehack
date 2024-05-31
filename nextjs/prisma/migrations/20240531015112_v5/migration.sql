/*
  Warnings:

  - The primary key for the `Ingredient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProductIngredients` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[name]` on the table `Ingredient` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ProductIngredients" DROP CONSTRAINT "ProductIngredients_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "ProductIngredients" DROP CONSTRAINT "ProductIngredients_productId_fkey";

-- DropForeignKey
ALTER TABLE "_ProductIngredients" DROP CONSTRAINT "_ProductIngredients_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductIngredients" DROP CONSTRAINT "_ProductIngredients_B_fkey";

-- AlterTable
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Ingredient_id_seq";

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Product_id_seq";

-- AlterTable
ALTER TABLE "ProductIngredients" DROP CONSTRAINT "ProductIngredients_pkey",
ALTER COLUMN "productId" SET DATA TYPE TEXT,
ALTER COLUMN "ingredientId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ProductIngredients_pkey" PRIMARY KEY ("productId", "ingredientId");

-- AlterTable
ALTER TABLE "_ProductIngredients" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_name_key" ON "Ingredient"("name");

-- AddForeignKey
ALTER TABLE "ProductIngredients" ADD CONSTRAINT "ProductIngredients_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductIngredients" ADD CONSTRAINT "ProductIngredients_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductIngredients" ADD CONSTRAINT "_ProductIngredients_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductIngredients" ADD CONSTRAINT "_ProductIngredients_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
