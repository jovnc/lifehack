"use client";
import React, { useState } from "react";

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

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

export function DashboardCard() {
  const [status, setStatus] = useState(false);
  const [demand, setDemand] = useState(5);

  return (
    <main className="w-full flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
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
            <button className="bg-gray-100 text-xs rounded-md">
              <p className="p-1">View Inventory</p>
            </button>
          </CardContent>
        </Card>
        <Card
          x-chunk="dashboard-01-chunk-1"
          className={`flex flex-col border-l-4 ${
            demand >= 0 ? "border-l-green-600" : "border-l-red-700"
          }`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Next Month's Predicted Demand
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                demand >= 0 ? "text-green-600" : "text-red-700"
              }`}
            >
              {demand >= 0 ? "+" : ""} {demand} from this month
            </div>
            <button className="bg-gray-100 text-xs rounded-md">
              <p className="p-1">View Details</p>
            </button>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card
          className="xl:col-span-2 border-l-4 border-gray-300"
          x-chunk="dashboard-01-chunk-4"
        >
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-4">
              <CardTitle>Demand Predictions</CardTitle>
              <CardDescription>
                Ingredients with the greatest predicted demand for the next
                month.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ingredient Name</TableHead>
                  <TableHead className="hidden xl:table-column">Type</TableHead>
                  <TableHead className="hidden xl:table-column">
                    Status
                  </TableHead>
                  <TableHead className="hidden xl:table-column">Date</TableHead>
                  <TableHead className="text-right">Amount (kg)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Rice Grains</div>
                  </TableCell>

                  <TableCell className="text-right">250</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Eggs</div>
                  </TableCell>

                  <TableCell className="text-right">204</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>

          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-4">
              <CardDescription>
                Ingredients with the lowest predicted demand for the next month.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ingredient Name</TableHead>
                  <TableHead className="hidden xl:table-column">Type</TableHead>
                  <TableHead className="hidden xl:table-column">
                    Status
                  </TableHead>
                  <TableHead className="hidden xl:table-column">Date</TableHead>
                  <TableHead className="text-right">Amount (kg)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Onions</div>
                  </TableCell>

                  <TableCell className="text-right">87</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Peas</div>
                  </TableCell>

                  <TableCell className="text-right">56</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export function GraphCard() {
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
          <div className="flex justify-center items-center w-full h-screen">
            <div className="w-full h-96">
              <LineChart width={400} height={400} data={data}>
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
