import { TransactionSource, TransactionType, WithTimestamps } from "../types";

/**
 * Create
 */
export type CreateTransactionInput = {
  title: string;
  amount: number;
  categoryId?: string;
  note?: string;
  source?: TransactionSource;
  date: number;

  type: TransactionType;
  budgetId: string;
};

/**
 * Update
 */
export type UpdateTransactionInput = Partial<CreateTransactionInput>;

/**
 * Sync (full entity)
 */
export type TransactionSyncDTO = WithTimestamps<{
  title: string;
  amount: number;
  categoryId?: string;
  note?: string;
  source?: TransactionSource;
  date: number;

  type: TransactionType;
  budgetId: string;
  month: string;
}>;
