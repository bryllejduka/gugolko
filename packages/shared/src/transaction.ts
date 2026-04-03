export type Transaction = {
  id: string;
  amount: number;
  type: "income" | "expense";
  source: "cash" | "gcash" | "maya" | "bank" | "credit";
  date: number;
  createdAt: number;
};