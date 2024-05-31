import { DollarSign, Users } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Transaction } from "./GraphTabs";
import { groupTotalPriceByMonth } from "@/lib/utils";
import TestButton from "./TestButton";

type Ingredient = {
  id: string;
  name: string;
  amount: number;
};

export function DashboardCard({
  ingredients,
  transactions,
}: {
  ingredients: Ingredient[];
  transactions: Transaction[];
}) {
  // check if there are enough ingredients in stock
  const status = ingredients.reduce((hasEnough, ingredient) => {
    return hasEnough && ingredient.amount > 0;
  }, true);
  const data = groupTotalPriceByMonth(transactions);

  if (data.length === 0) {
    return <p className="text-center p-4">No Data to show.</p>;
  }

  const newData = (data[data.length - 1].totalSales * 1.1).toFixed(2);

  return (
    <main className="w-full flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 grid-cols-2">
        <Card
          x-chunk="dashboard-01-chunk-0"
          className={`flex flex-col border-l-4 ${
            status ? "border-l-green-600" : "border-l-red-700"
          }`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Inventory Status
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                status ? "text-green-600" : "text-red-700"
              }`}
            >
              {status ? "Sufficient Supply" : "Insufficient Supply"}
            </div>

            <Button size="sm" variant="secondary" className="mt-4">
              <Link href="/protected/ingredients" className="text-xs">
                View Inventory
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card
          x-chunk="dashboard-01-chunk-1"
          className={`flex flex-col border-l-4 border-l-green-600
          }`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Next Month's Predicted Revenue
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$ {newData}</div>
          </CardContent>
        </Card>
      </div>
      <TestButton ingredients={ingredients} />
    </main>
  );
}
