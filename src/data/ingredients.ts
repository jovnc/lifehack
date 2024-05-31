import db from "@/db/db";

export const getIngredients = async () => {
  const ingredients = await db.ingredient.findMany();
  return ingredients;
};

export const getIngredientById = async (id: string) => {
  const ingredient = await db.ingredient.findUnique({ where: { id } });
  return ingredient;
};

export const getIngredientByName = async (name: string) => {
  const ingredient = await db.ingredient.findUnique({ where: { name } });
  return ingredient;
};
