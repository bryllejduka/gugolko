

import Layout from "./layout";
import AddExpenseForm from "@/features/transactions/components/add-expense-form";

export default function Page() {

  return (
    <Layout>
      <h1>Gugol KO</h1>
      <div className="flex justify-center items-center">
        <AddExpenseForm />

      </div>
    </Layout>
  );
}
