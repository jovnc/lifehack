import { Carrot } from "lucide-react";
import { IngredientDataTable } from "./_components/IngredientDataTable";
import { getIngredients } from "@/data/ingredients";

export default async function page() {
  const ingredients = await getIngredients();

  return (
    <div className="w-full">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <p className="text-3xl font-bold flex flex-row gap-2">
          <Carrot />
          Ingredients
        </p>
        <IngredientDataTable ingredients={ingredients} />
      </main>
    </div>
  );
}
