import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React from "react";
import EditIngredientForm from "./EditIngredientForm";
import { Button } from "@/components/ui/button";

type Ingredient = {
  id: string;
  name: string;
  amount: string;
};

export const EditIngredientButton = ({
  ingredient,
}: {
  ingredient: Ingredient;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <p className="cursor-pointer text-sm p-2 hover:bg-gray-100">Edit</p>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Ingredient Form</AlertDialogTitle>
          <AlertDialogDescription>
            <EditIngredientForm
              id={ingredient.id}
              ingredientName={ingredient.name}
              amount={ingredient.amount}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};
