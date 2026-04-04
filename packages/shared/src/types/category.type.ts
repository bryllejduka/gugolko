import { BaseEntity, TransactionType } from "./base.type";

export type Category = BaseEntity & {
  name: string;
  type: TransactionType;

  isSystem?: boolean;
};
