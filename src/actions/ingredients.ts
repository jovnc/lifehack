"use server";

import db from "@/db/db";
import { NewIngredientSchema } from "@/schemas";
import { z } from "zod";

export const addIngredient = async (
  values: z.infer<typeof NewIngredientSchema>
) => {
  const validatedFields = NewIngredientSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { name, amount } = validatedFields.data;

  const newIngredient = await db.ingredient.create({
    data: {
      name,
      amount: parseInt(amount),
    },
  });

  return { success: "Ingredient added", newIngredient };
};

export const editIngredient = async (
  values: z.infer<typeof NewIngredientSchema>,
  id: string
) => {
  const validatedFields = NewIngredientSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { name, amount } = validatedFields.data;

  const updatedIngredient = await db.ingredient.update({
    where: {
      id,
    },
    data: {
      name,
      amount: parseInt(amount),
    },
  });

  return { success: "Ingredient updated", updatedIngredient };
};

export const deleteIngredient = async (id: string) => {
  const res = await db.ingredient.delete({
    where: {
      id,
    },
  });

  if (!res) {
    return { error: "Failed to delete ingredient" };
  }

  return { success: "Ingredient deleted" };
};

export const decreaseIngredientAmount = async (id: string, amount: number) => {
  const res = await db.ingredient.update({
    where: {
      id,
    },
    data: {
      amount: {
        decrement: amount,
      },
    },
  });
  if (!res) {
    return { error: "Failed to decrease ingredient amount" };
  }
  return { success: "Ingredient amount decreased" };
};
