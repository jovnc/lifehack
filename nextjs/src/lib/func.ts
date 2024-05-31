import { Transaction } from "@/app/protected/_components/GraphTabs";

export const groupTotalIngredientsByMonth = (transactions: Transaction[]) => {
  const ingredientUsage: { [key: string]: { [key: string]: number } } = {};

  transactions.forEach((transaction, i) => {
    const date = new Date(transaction.date);
    const month =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0");

    transaction.products.forEach((product, j) => {
      product.ingredients.forEach((ingredient, index) => {
        if (!ingredientUsage[month]) {
          ingredientUsage[month] = {};
        }
        if (!ingredientUsage[month][ingredient.name]) {
          ingredientUsage[month][ingredient.name] = 0;
        }
        ingredientUsage[month][ingredient.name] +=
          product.ingredientAmounts[index] * transaction.productQuantities[j];
      });
    });
  });

  return ingredientUsage;
};

export const getAmountForEachIngredientByMonth = (data: any) => {
  const result: any[] = [];

  for (const month in data) {
    for (const ingredient in data[month]) {
      result.push({
        name: month,
        value: data[month][ingredient],
        ingredient: ingredient,
      });
    }
  }

  return result;
};
