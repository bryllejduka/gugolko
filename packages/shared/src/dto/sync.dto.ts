import { TransactionSyncDTO } from "./transaction.dto";
import { CategorySyncDTO } from "./category.dto";
import { BudgetSyncDTO } from "./budget.dto";

/**
 * Client → Server
 */
export type SyncRequestDTO = {
  lastSyncedAt: number;

  changes: {
    transactions: TransactionSyncDTO[];
    categories: CategorySyncDTO[];
    budgets: BudgetSyncDTO[];
  };
};

/**
 * Server → Client
 */
export type SyncResponseDTO = {
  serverTime: number;

  changes: {
    transactions: TransactionSyncDTO[];
    categories: CategorySyncDTO[];
    budgets: BudgetSyncDTO[];
  };
};
