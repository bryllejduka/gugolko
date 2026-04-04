import { db } from "@/lib/dexie";
import { v4 as uuid } from "uuid";

import type { Transaction } from "@gugolko/shared/src/types";

import type {
  CreateTransactionInput,
  UpdateTransactionInput,
  TransactionSyncDTO,
} from "@gugolko/shared/src/dto";

/**
 * Helpers
 */

// derive "2026-04" from timestamp
function getMonthFromDate(date: number): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

/**
 * Repository
 */
export const transactionRepo = {
  /**
   * Create
   */
  async create(input: CreateTransactionInput): Promise<Transaction> {
    const now = Date.now();

    const transaction: Transaction = {
      id: uuid(),
      createdAt: now,
      updatedAt: now,
      deletedAt: null,

      ...input,
      source: input.source || "uncategorized",
      month: getMonthFromDate(input.date),
    };

    await db.transactions.add(transaction);
    return transaction;
  },

  /**
   * Bulk Create (useful for sync or import)
   */
  async bulkCreate(inputs: CreateTransactionInput[]) {
    const now = Date.now();

    const records: Transaction[] = inputs.map((input) => ({
      id: uuid(),
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
      ...input,
      month: getMonthFromDate(input.date),
    }));

    await db.transactions.bulkAdd(records);
    return records;
  },

  /**
   * Update
   */
  async update(
    id: string,
    updates: UpdateTransactionInput,
  ): Promise<Transaction | null> {
    const existing = await db.transactions.get(id);
    if (!existing || existing.deletedAt) return null;

    const updated: Transaction = {
      ...existing,
      ...updates,
      updatedAt: Date.now(),

      // recompute month if date changes
      month: updates.date ? getMonthFromDate(updates.date) : existing.month,
    };

    await db.transactions.put(updated);
    return updated;
  },

  /**
   * Soft Delete
   */
  async softDelete(id: string): Promise<void> {
    const existing = await db.transactions.get(id);
    if (!existing || existing.deletedAt) return;

    const now = Date.now();

    await db.transactions.put({
      ...existing,
      deletedAt: now,
      updatedAt: now,
    });
  },

  /**
   * Get by ID
   */
  async getById(id: string): Promise<Transaction | undefined> {
    return db.transactions.get(id);
  },

  /**
   * Get all (non-deleted)
   */
  async getAll(): Promise<Transaction[]> {
    return db.transactions.filter((t) => !t.deletedAt).toArray();
  },

  /**
   * Get by Budget
   */
  async getByBudget(budgetId: string): Promise<Transaction[]> {
    return db.transactions
      .where("budgetId")
      .equals(budgetId)
      .filter((t) => !t.deletedAt)
      .toArray();
  },

  /**
   * Get by Month (fallback / alternative)
   */
  async getByMonth(month: string): Promise<Transaction[]> {
    return db.transactions
      .where("month")
      .equals(month)
      .filter((t) => !t.deletedAt)
      .toArray();
  },

  /**
   * Get changes since last sync
   */
  async getChangesSince(lastSyncedAt: number): Promise<TransactionSyncDTO[]> {
    return db.transactions.where("updatedAt").above(lastSyncedAt).toArray();
  },

  /**
   * Apply server changes (SYNC MERGE)
   */
  async applyServerChanges(changes: TransactionSyncDTO[]): Promise<void> {
    await db.transaction("rw", db.transactions, async () => {
      for (const incoming of changes) {
        const existing = await db.transactions.get(incoming.id);

        // If no local record → insert
        if (!existing) {
          await db.transactions.add(incoming);
          continue;
        }

        // Last-write-wins
        if (incoming.updatedAt > existing.updatedAt) {
          await db.transactions.put(incoming);
        }
      }
    });
  },
};
