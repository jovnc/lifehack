import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IngredientGraphCard } from "./IngredientGraphCard";
import { TransactionGraphCard } from "./TransactionGraphCard";

export type Transaction = {
  id: string;
  totalPrice: number;
  date: Date;
  productIds: string[];
  productQuantities: number[];
};

export function GraphTabs({ transactions }: { transactions: Transaction[] }) {
  return (
    <Tabs defaultValue="ingredients" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
        <TabsTrigger value="transactions">Transactions</TabsTrigger>
      </TabsList>
      <TabsContent value="ingredients">
        <IngredientGraphCard />
      </TabsContent>
      <TabsContent value="transactions">
        <TransactionGraphCard transactions={transactions} />
      </TabsContent>
    </Tabs>
  );
}
