export type TransactionType = "income" | "expense";

export const TRANSACTION_SOURCES = {
  ewallet: "ewallet",
  bank: "bank",
  credit: "credit",
  cash: "cash",
} as const;

export type TransactionSource =
  (typeof TRANSACTION_SOURCES)[keyof typeof TRANSACTION_SOURCES];

export type BaseEntity = {
  id: string;
  createdAt: number;
  updatedAt: number;
  deletedAt?: number | null;
};
