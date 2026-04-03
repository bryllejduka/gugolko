import { db } from "@/lib/dexie";
import { Transaction } from "@gugolko/shared";

export const transactionsRepository = {
  async addExpense(data: {
    amount: number;
    categoryId?: string;
    note?: string;
    source: "cash" | "ewallet" | "bank" | "credit";
    date: number;
  }): Promise<Transaction> {
    const now = Date.now();

    const transaction: Transaction = {
      id: crypto.randomUUID(),
      type: "expense",
      amount: data.amount,
      categoryId: data.categoryId,
      note: data.note,
      source: data.source,
      date: data.date,
      month: new Date(data.date).toISOString().slice(0, 7),
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    };

    await db.transactions.add(transaction);

    return transaction;
  },
};
