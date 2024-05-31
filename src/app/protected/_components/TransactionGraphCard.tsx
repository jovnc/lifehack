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
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { Transaction } from "./GraphTabs";
import { groupTotalPriceByMonth } from "@/lib/utils";

export function TransactionGraphCard({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const data = groupTotalPriceByMonth(transactions);

  if (data.length === 0) {
    return <p className="text-center p-4">No Data to show.</p>;
  }

  const newData = data[data.length - 1].totalSales * 1.1;
  // Get the current date
  const currentDate = new Date();

  // Create a new date object for the next month
  const nextMonthDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1
  );

  // Format the new date to "Month Year" format
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  });
  const formattedNextMonth = formatter.format(nextMonthDate);
  const updatedData = [
    ...data,
    {
      name: formattedNextMonth,
      totalSales: newData,
      predicted: true,
    },
  ];

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
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={updatedData}>
                  <Tooltip />
                  <Legend
                    payload={[
                      {
                        value: "Actual Value",
                        type: "square",
                        id: "ID01",
                        color: "#8884d8",
                      },
                      {
                        value: "Predicted Value",
                        type: "square",
                        id: "ID02",
                        color: "#128abf",
                      },
                    ]}
                  />

                  <Bar dataKey="totalSales">
                    {data.map((entry, index) => {
                      return (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.predicted ? "#128abf" : "#8884d8"}
                        />
                      );
                    })}
                  </Bar>

                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="name" />
                  <YAxis />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
