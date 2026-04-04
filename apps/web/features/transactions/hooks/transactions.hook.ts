import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/dexie";

import type { Transaction } from "@gugolko/shared/src/types";

/**
 * Get all transactions (non-deleted)
 */
export function useTransactions(): Transaction[] | undefined {
  return useLiveQuery(async () => {
    return db.transactions.filter((t) => !t.deletedAt).toArray();
  }, []);
}

/**
 * Get transactions by budgetId
 */
export function useTransactionsByBudget(
  budgetId?: string | null,
): Transaction[] | undefined {
  return useLiveQuery(async () => {
    if (!budgetId) return [];

    return db.transactions
      .where("budgetId")
      .equals(budgetId)
      .filter((t) => !t.deletedAt)
      .toArray();
  }, [budgetId]);
}

/**
 * Get transactions by month (fallback or alternative)
 */
export function useTransactionsByMonth(
  month?: string,
): Transaction[] | undefined {
  return useLiveQuery(async () => {
    if (!month) return [];

    return db.transactions
      .where("month")
      .equals(month)
      .filter((t) => !t.deletedAt)
      .toArray();
  }, [month]);
}

/**
 * Get single transaction
 */
export function useTransaction(id?: string): Transaction | undefined {
  return useLiveQuery(async () => {
    if (!id) return undefined;

    const tx = await db.transactions.get(id);

    if (!tx || tx.deletedAt) return undefined;
    return tx;
  }, [id]);
}

/**
 * Get recent transactions (for dashboard)
 */
export function useRecentTransactions(
  limit: number = 5,
): Transaction[] | undefined {
  return useLiveQuery(async () => {
    const all = await db.transactions.filter((t) => !t.deletedAt).toArray();

    return all.sort((a, b) => b.date - a.date).slice(0, limit);
  }, [limit]);
}

/**
 * Transaction Summary
 */

export function useTransactionSummary(budgetId?: string | null) {
  return useLiveQuery(async () => {
    if (!budgetId) {
      return {
        income: 0,
        expense: 0,
        balance: 0,
      };
    }

    const transactions = await db.transactions
      .where("budgetId")
      .equals(budgetId)
      .filter((t) => !t.deletedAt)
      .toArray();

    let income = 0;
    let expense = 0;

    for (const t of transactions) {
      if (t.type === "income") income += t.amount;
      else expense += t.amount;
    }

    return {
      income,
      expense,
      balance: income - expense,
    };
  }, [budgetId]);
}

/**
 * Group by Category (charts)
 */
export function useCategoryBreakdown(budgetId?: string | null) {
  return useLiveQuery(async () => {
    if (!budgetId) return {};

    const transactions = await db.transactions
      .where("budgetId")
      .equals(budgetId)
      .filter((t) => !t.deletedAt && t.type === "expense")
      .toArray();

    const result: Record<string, number> = {};

    for (const t of transactions) {
      const key = t.categoryId ?? "uncategorized";

      result[key] = (result[key] || 0) + t.amount;
    }

    return result;
  }, [budgetId]);
}
