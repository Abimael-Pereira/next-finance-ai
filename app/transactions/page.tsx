import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import AddTransactionButton from "../_components/add-transaction-button";
import { DataTable } from "../_components/ui/data-table";
import { ScrollArea } from "../_components/ui/scroll-area";
import { db } from "../_lib/prisma";
import { transactionColumns } from "./_columns";

const TransactionsPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const transactions = await db.transaction.findMany({
    where: { userId },
  });
  return (
    <div className="space-y-6 overflow-hidden p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-bold">Transações</h1>
        <AddTransactionButton />
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <DataTable
          columns={transactionColumns}
          data={JSON.parse(JSON.stringify(transactions))}
        />
      </ScrollArea>
    </div>
  );
};

export default TransactionsPage;
