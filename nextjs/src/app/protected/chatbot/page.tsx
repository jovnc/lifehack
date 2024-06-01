import { auth } from "@/auth";
import React from "react";
import { ChatbotWrapper } from "./_components/chatbot-wrapper";
import { Card } from "@/components/ui/card";
import { getTransactionsWithProductAndIngredients } from "@/data/transactions";

export default async function page() {
  const session = await auth();
  const message = null;

  const transactions = await getTransactionsWithProductAndIngredients();

  const filteredTransactions = transactions.map((t) => {
    return {
      date: t.date,
      totalPrice: t.totalPrice,
      products: t.products.map((p) => p.name),
      ingredients: t.products.map((p) => p.ingredients.map((i) => i.name)),
    };
  });

  const stringJSON = JSON.stringify(filteredTransactions, null, 2);

  return (
    <main className="w-full flex min-h-screen text-wrap">
      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col gap-2">
          <p className="text-3xl font-bold">Gain Business Insights</p>
          <p className="text-gray-500 text-xl">
            Based on your store&apos;s data
          </p>
        </div>
        <Card className="h-3/4 flex items-end overflow-y-auto">
          <div className="flex flex-col  w-full p-6 gap-8">
            <ChatbotWrapper session={session} stringJSON={stringJSON} />
          </div>
        </Card>
      </div>
    </main>
  );
}
