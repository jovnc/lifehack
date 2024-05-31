"use client";
import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Ingredient, Transaction } from "./GraphTabs";
import {
  getAmountForEachIngredientByMonth,
  groupTotalIngredientsByMonth,
} from "@/lib/func";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7300",
  "#387908",
  "#a832a6",
  "#6c6cd9",
  "#d93939",
];

export function IngredientGraphCard({
  ingredients,
  transactions,
}: {
  ingredients: Ingredient[];
  transactions: Transaction[];
}) {
  // aggregate all ingredients by month
  const newData = groupTotalIngredientsByMonth(transactions);
  const cleanedData = getAmountForEachIngredientByMonth(newData);

  const aggregateData: any = {};
  const ingredientList: string[] = [];

  cleanedData.forEach((item) => {
    const { name: month, value, ingredient } = item;
    if (!aggregateData[month]) {
      aggregateData[month] = { name: month };
    }
    aggregateData[month][ingredient] = value;
    if (!ingredientList.includes(ingredient)) {
      ingredientList.push(ingredient);
    }
  });

  const finalData = Object.values(aggregateData);
  finalData.sort((a: any, b: any) => a.name.localeCompare(b.name));

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 w-full">
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-4">
            <CardTitle>Demand Visualisation</CardTitle>
            <CardDescription>Demand for ingredients over time.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center w-full">
            <div className="w-full h-96">
              <LineChart data={finalData} width={400} height={300}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {ingredientList.map((ingredient, i) => (
                  <Line
                    key={i}
                    type="monotone"
                    dataKey={ingredient}
                    stroke={COLORS[i]}
                    activeDot={{ r: 8 }}
                  />
                ))}
              </LineChart>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
