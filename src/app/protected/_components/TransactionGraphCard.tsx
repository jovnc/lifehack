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
  Bar,
  BarChart,
  Tooltip,
} from "recharts";
import { Transaction } from "./GraphTabs";
import { groupTotalPriceByMonth } from "@/lib/utils";

export function TransactionGraphCard({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const data = groupTotalPriceByMonth(transactions);
  console.log(data);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 w-full">
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-4">
            <CardTitle>Transaction Graph</CardTitle>
            <CardDescription>Recorded transactions over time.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center w-full">
            <div className="w-full h-96">
              <BarChart width={400} height={400} data={data}>
                <Tooltip />
                <Bar dataKey="totalSales" fill="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
              </BarChart>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
