import { create } from "zustand";

type TransactionType = "income" | "expense";

type UIState = {
  // 🔹 Budget
  selectedBudgetId: string | null;
  setSelectedBudgetId: (id: string | null) => void;

  // 🔹 Filters
  transactionFilter: {
    type?: TransactionType;
  };
  setTransactionFilter: (filter: Partial<UIState["transactionFilter"]>) => void;
  resetTransactionFilter: () => void;

  // 🔹 UI State
  isAddTransactionOpen: boolean;
  setAddTransactionOpen: (open: boolean) => void;

  // 🔹 Sync
  isSyncing: boolean;
  setIsSyncing: (value: boolean) => void;
};

export const useUIStore = create<UIState>((set) => ({
  /**
   * Budget
   */
  selectedBudgetId: null,
  setSelectedBudgetId: (id) => set({ selectedBudgetId: id }),

  /**
   * Filters
   */
  transactionFilter: {},
  setTransactionFilter: (filter) =>
    set((state) => ({
      transactionFilter: {
        ...state.transactionFilter,
        ...filter,
      },
    })),
  resetTransactionFilter: () => set({ transactionFilter: {} }),

  /**
   * UI Controls
   */
  isAddTransactionOpen: false,
  setAddTransactionOpen: (open) => set({ isAddTransactionOpen: open }),

  /**
   * Sync
   */
  isSyncing: false,
  setIsSyncing: (value) => set({ isSyncing: value }),
}));
