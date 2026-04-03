import { BaseEntity, TransactionSource, TransactionType } from "./base.type";

export type TransactionDTO = {
  amount: number;
  categoryId?: string;
  note?: string;
  source: TransactionSource;
  date: number;
};

export type Transaction = BaseEntity &
  TransactionDTO & {
    type: TransactionType;
    month: string;
  };
