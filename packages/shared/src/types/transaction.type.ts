import { BaseEntity, TransactionSource, TransactionType } from "./base.type";

export type Transaction = BaseEntity & {
  amount: number;
  categoryId?: string;
  note?: string;
  source?: TransactionSource;
  date: number;

  type: TransactionType;

  budgetId: string;
  month: string;
};
