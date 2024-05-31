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
} from "recharts";

export function IngredientGraphCard() {
  const data = [
    { name: "Jan", uv: 400, pv: 2400, amt: 2400 },
    { name: "Feb", uv: 300, pv: 2210, amt: 2290 },
    { name: "Mar", uv: 200, pv: 2290, amt: 2000 },
    { name: "Apr", uv: 278, pv: 2000, amt: 2181 },
    { name: "May", uv: 189, pv: 2181, amt: 2500 },
    { name: "Jun", uv: 239, pv: 2500, amt: 2100 },
    { name: "Jul", uv: 349, pv: 2100, amt: 2300 },
  ];
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
              <LineChart width={400} height={400} data={data}>
                <Tooltip />
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
              </LineChart>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
