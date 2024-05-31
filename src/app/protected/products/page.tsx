import { getIngredients } from "@/data/ingredients";
import { DataTable } from "./_components/DataTable";
import { getProductsWithIngredients } from "@/data/products";
import { Package } from "lucide-react";

export default async function page() {
  const ingredients = await getIngredients();
  const products = await getProductsWithIngredients();

  console.log(products[0].ingredients);

  return (
    <div className="w-full">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <p className="text-3xl font-bold flex flex-row gap-2">
          <Package />
          Products
        </p>
        <DataTable ingredients={ingredients} products={products} />
      </main>
    </div>
  );
}
