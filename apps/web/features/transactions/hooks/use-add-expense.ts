import { useState } from "react";
import { transactionsRepository } from "../transactions.repository";
import { Transaction, TransactionDTO } from "@gugolko/shared";

export const useAddExpense = () => {
  const [loading, setLoading] = useState(false);

  const submit = async (data: TransactionDTO) => {
    try {
      setLoading(true);
      await transactionsRepository.addExpense(data);
    } finally {
      setLoading(false);
    }
  };

  return {
    submit,
    loading,
  };
};
