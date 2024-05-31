import db from "@/db/db";

export const getTransactionsWithProducts = async () => {
  const transactions = await db.transaction.findMany({
    include: {
      products: true,
    },
  });
  return transactions;
};

export const getTransactions = async () => {
  const transactions = await db.transaction.findMany();
  return transactions;
};
