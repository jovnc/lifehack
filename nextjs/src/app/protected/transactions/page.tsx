import { getProducts } from "@/data/products";
import { TransactionDataTable } from "./_components/TransactionDataTable";
import { getTransactionsWithProducts } from "@/data/transactions";
import { FaMoneyBill } from "react-icons/fa";
import { getIngredients } from "@/data/ingredients";

export type Product = {
  id: string;
  name: string;
  price: number;
  ingredientIds: string[];
  ingredientAmounts: number[];
};

export default async function page() {
  const products = await getProducts();
  const transactions = await getTransactionsWithProducts();
  const ingredients = await getIngredients();

  return (
    <div className="w-full">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <p className="text-3xl font-bold flex flex-row gap-2">
          <FaMoneyBill />
          Transactions
        </p>
        <TransactionDataTable products={products} transactions={transactions} />
      </main>
    </div>
  );
}
