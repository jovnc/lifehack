import db from "@/db/db";

export const getProducts = async () => {
  const products = await db.product.findMany();
  return products;
};

export const getProductsWithIngredients = async () => {
  const products = await db.product.findMany({
    include: {
      ingredients: true,
    },
  });
  return products;
};

export const getProductByName = async (name: string) => {
  const product = await db.product.findUnique({
    where: {
      name,
    },
  });
  return product;
};
