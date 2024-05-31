"use server";

import { getProductByName } from "@/data/products";
import db from "@/db/db";
import { NewTransactionSchema } from "@/schemas";
import { z } from "zod";

export const addTransaction = async (
  values: z.infer<typeof NewTransactionSchema>
) => {
  const validatedFields = NewTransactionSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { products } = validatedFields.data;
  let totalPrice = 0;

  const updatedProducts = await Promise.all(
    products.map(async (product) => {
      const foundProduct = await getProductByName(product.name);
      if (!foundProduct) {
        return { error: "Product not found" };
      }

      totalPrice += foundProduct.price * product.amount;
      return {
        amount: product.amount,
        id: foundProduct.id,
      };
    })
  );

  const transaction = await db.transaction.create({
    data: {
      productIds: updatedProducts.map((product) => product.id ?? ""),
      totalPrice: totalPrice,
      productQuantities: updatedProducts.map((product) => product.amount ?? 0),
      products: {
        connect: updatedProducts.map((product) => ({
          id: product.id,
        })),
      },
    },
  });

  if (!transaction) {
    return { error: "Transaction not created" };
  }

  return { success: true };
};

export const deleteTransaction = async (id: string) => {
  const transaction = await db.transaction.delete({
    where: {
      id,
    },
  });
  if (!transaction) {
    return { error: "Transaction not deleted" };
  }
  return { success: true };
};
