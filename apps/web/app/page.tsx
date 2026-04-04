

import Layout from "./layout";
import { AddTransactionForm } from "@/features/transactions/components/add-transaction-form";

export default function Page() {

  return (
    <Layout>
      <h1>Gugol KO</h1>
      <div className="flex justify-center items-center">
        <AddTransactionForm />

      </div>
    </Layout>
  );
}
