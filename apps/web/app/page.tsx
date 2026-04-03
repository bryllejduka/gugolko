import { Button } from "@/shared/components/ui/button";
import { Transaction } from "@gugolko/shared";

import Layout from "./layout";

export default function Page() {
  const test: Transaction = {
    id: "1",
    amount: 100,
    type: "expense",
    source: "cash",
    date: Date.now(),
    createdAt: Date.now(),
  };

  return (
    <Layout>
      <div>Hello {test.amount}</div>
      <Button variant={"secondary"}>Click me</Button>
    </Layout>
  );
}
