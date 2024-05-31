/*
  Warnings:

  - Added the required column `amount` to the `ProductIngredients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductIngredients" ADD COLUMN     "amount" INTEGER NOT NULL;
