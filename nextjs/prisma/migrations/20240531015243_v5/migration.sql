/*
  Warnings:

  - You are about to drop the column `amount` on the `ProductIngredients` table. All the data in the column will be lost.
  - Added the required column `ingredientAmount` to the `ProductIngredients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductIngredients" DROP COLUMN "amount",
ADD COLUMN     "ingredientAmount" INTEGER NOT NULL;
