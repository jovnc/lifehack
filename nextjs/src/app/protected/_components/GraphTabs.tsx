import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IngredientGraphCard } from "./IngredientGraphCard";
import { TransactionGraphCard } from "./TransactionGraphCard";

export type Transaction = {
  id: string;
  totalPrice: number;
  date: Date;
  productIds: string[];
  productQuantities: number[];
  products: Product[];
};

export type Ingredient = {
  id: string;
  amount: number;
  name: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
  ingredientIds: string[];
  ingredientAmounts: number[];
  ingredients: Ingredient[];
};

export function GraphTabs({
  transactions,
  ingredients,
}: {
  transactions: Transaction[];
  ingredients: Ingredient[];
}) {
  return (
    <Tabs defaultValue="ingredients" className="w-full mt-8">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
        <TabsTrigger value="transactions">Transactions</TabsTrigger>
      </TabsList>
      <TabsContent value="ingredients">
        <IngredientGraphCard
          transactions={transactions}
          ingredients={ingredients}
        />
      </TabsContent>
      <TabsContent value="transactions">
        <TransactionGraphCard transactions={transactions} />
      </TabsContent>
    </Tabs>
  );
}
