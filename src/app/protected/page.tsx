import React from "react";
import { DashboardCard } from "./_components/DashboardCard";
import { getIngredients } from "@/data/ingredients";
import { GraphTabs } from "./_components/GraphTabs";
import { getTransactions } from "@/data/transactions";

export default async function page() {
  const ingredients = await getIngredients();
  const transactions = await getTransactions();

  return (
    <main className="w-full grid grid-cols-2 gap-4 min-h-screen text-wrap">
      <DashboardCard ingredients={ingredients} />
      <GraphTabs transactions={transactions} ingredients={ingredients} />
    </main>
  );
}
