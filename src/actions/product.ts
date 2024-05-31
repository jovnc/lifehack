"use server";

import { getIngredientByName } from "@/data/ingredients";
import db from "@/db/db";
import { NewProductSchema } from "@/schemas";
import { z } from "zod";

export const addProduct = async (values: z.infer<typeof NewProductSchema>) => {
  const validatedFields = NewProductSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { name, price, ingredients } = validatedFields.data;

  const updatedIngredients = await Promise.all(
    ingredients.map(async (ingredient) => {
      const foundIngredient = await getIngredientByName(ingredient.name);
      if (!foundIngredient) {
        return { error: "Ingredient not found" };
      }
      return {
        amount: ingredient.amount,
        id: foundIngredient.id,
      };
    })
  );

  if (!updatedIngredients) {
    return { error: "Ingredient not found" };
  }

  const product = await db.product.create({
    data: {
      name,
      price: parseInt(price),
      ingredientIds: updatedIngredients.map(
        (ingredient) => ingredient.id ?? ""
      ),
      ingredientAmounts: updatedIngredients.map(
        (ingredient) => ingredient.amount ?? 0
      ),
      ingredients: {
        connect: updatedIngredients.map((ingredient) => ({
          id: ingredient.id,
        })),
      },
    },
  });

  if (!product) {
    return { error: "Product not created" };
  }

  return { success: true };
};

export const deleteProduct = async (id: string) => {
  const product = await db.product.delete({ where: { id } });
  if (!product) {
    return { error: "Product not deleted" };
  }
  return { success: true };
};
