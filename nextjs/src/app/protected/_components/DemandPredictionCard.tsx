import React from "react";
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

export default function DemandPredictionCard({ data }: { data: any }) {
  return (
    <div className="grid gap-4">
      <Card
        className="xl:col-span-2 border-l-4 border-gray-300"
        x-chunk="dashboard-01-chunk-4"
      >
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-4">
            <CardTitle>Demand Predictions</CardTitle>
            <CardDescription>
              Ingredients and their predicted demand for the next month.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ingredient Name</TableHead>
                <TableHead className="hidden xl:table-column">Type</TableHead>
                <TableHead className="hidden xl:table-column">Status</TableHead>
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
              {data.map((item: any, i: number) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="font-medium">{item.Ingredient}</div>
                  </TableCell>
                  <TableCell className="text-right">
                    {item.Prediction.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
