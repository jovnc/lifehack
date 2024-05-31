"use client";
import { predict } from "@/actions/predict";
import { Button } from "@/components/ui/button";
import React from "react";
import DemandPredictionCard from "./DemandPredictionCard";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestButton({ ingredients }: any) {
  const [isPending, startTransition] = React.useTransition();
  const now = new Date();
  const [show, setShow] = React.useState();

  const currentMonth = now.getMonth() + 2;
  const ingredientNames = ingredients.map((ingredient: any) => {
    const newItem = { Ingredient: ingredient.name, Month: currentMonth };
    return newItem;
  });

  const handleClick = () => {
    startTransition(async () => {
      const res = await predict(ingredientNames);
      if (res.success) {
        setShow(res.data);
        toast.success("Predicted successfully");
      } else {
        toast.error(res.message);
      }
    });
  };

  if (!show)
    return (
      <Card className="border-l-4 border-gray-300 p-8">
        <CardHeader className="pl-0">
          <CardTitle>Predict Ingredients</CardTitle>
        </CardHeader>
        <CardContent className="pl-0">
          <p className="text-sm">
            Using machine learning algorithms, we are able to predict the next
            month's ingredients so that you can prepare sufficient ingredients
            to meet next month's demand!
          </p>
        </CardContent>
        <Button onClick={handleClick}>Predict Next Month's Ingredients</Button>
      </Card>
    );

  return <DemandPredictionCard data={show} />;
}
