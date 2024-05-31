"use client";
import { predict } from "@/actions/predict";
import { Button } from "@/components/ui/button";
import React from "react";
import DemandPredictionCard from "./DemandPredictionCard";

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
      }
    });
  };

  if (!show)
    return (
      <Button onClick={handleClick}>Predict Next Month's Ingredients</Button>
    );

  return <DemandPredictionCard data={show} />;
}
