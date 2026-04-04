import { TransactionType, WithTimestamps } from "../types";

/**
 * Create
 */
export type CreateCategoryInput = {
  name: string;
  type: TransactionType;
};

/**
 * Update
 */
export type UpdateCategoryInput = Partial<CreateCategoryInput>;

/**
 * Sync
 */
export type CategorySyncDTO = WithTimestamps<{
  name: string;
  type: TransactionType;
  isSystem?: boolean;
}>;
