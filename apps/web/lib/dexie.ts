import { Budget, Category, Transaction } from "@gugolko/shared";
import Dexie, { Table } from "dexie";

/* =========================
   DB
========================= */

class AppDB extends Dexie {
  transactions!: Table<Transaction, string>;
  categories!: Table<Category, string>;
  budgets!: Table<Budget, string>;

  constructor() {
    super("gugolko-db");

    this.version(1).stores({
      transactions: `
        id,
        budgetId,
        month,
        type,
        categoryId,
        source,
        date,
        updatedAt,
        deletedAt
      `,

      categories: `
        id,
        type,
        updatedAt,
        deletedAt
      `,

      budgets: `
        id,
        month,
        updatedAt,
        deletedAt
      `,
    });
  }
}

export const db = new AppDB();
