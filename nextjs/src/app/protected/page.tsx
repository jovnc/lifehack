import React from "react";
import { DashboardCard } from "./_components/DashboardCard";
import { getIngredients } from "@/data/ingredients";
import { GraphTabs } from "./_components/GraphTabs";
import { getTransactionsWithProductAndIngredients } from "@/data/transactions";

export default async function page() {
  const ingredients = await getIngredients();
  const transactions = await getTransactionsWithProductAndIngredients();

  return (
    <main className="w-full  min-h-screen text-wrap">
      <p className="pl-8 text-3xl font-bold">Dashboard</p>
      <div className="w-full grid grid-cols-2 gap-4">
        <DashboardCard transactions={transactions} ingredients={ingredients} />
        <GraphTabs transactions={transactions} ingredients={ingredients} />
      </div>
    </main>
  );
}
