import { WithTimestamps } from "../types";

/**
 * Create
 */
export type CreateBudgetInput = {
  month: string;
  name?: string;
};

/**
 * Update
 */
export type UpdateBudgetInput = Partial<CreateBudgetInput>;

/**
 * Sync
 */
export type BudgetSyncDTO = WithTimestamps<{
  month: string;
  name?: string;
  isTemplate?: boolean;
}>;
