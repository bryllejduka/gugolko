export type Timestamp = number;

export type BaseEntity = {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt: Timestamp | null;
};

/**
 * Helper: Add timestamps to any type
 */
export type WithTimestamps<T> = T & BaseEntity;

/**
 * Transaction Types
 */
export const TRANSACTION_TYPES = {
  income: "income",
  expense: "expense",
} as const;

export type TransactionType =
  (typeof TRANSACTION_TYPES)[keyof typeof TRANSACTION_TYPES];

export const TRANSACTION_SOURCES = {
  ewallet: "ewallet",
  bank: "bank",
  credit: "credit",
  cash: "cash",
  others: "others",
  uncategorized: "uncategorized",
} as const;

export type TransactionSource =
  (typeof TRANSACTION_SOURCES)[keyof typeof TRANSACTION_SOURCES];
