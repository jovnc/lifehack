-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_id_fkey";

-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "productId" TEXT;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
