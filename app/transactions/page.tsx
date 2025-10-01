import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import AddTransactionButton from "../_components/add-transaction-button";
import { DataTable } from "../_components/ui/data-table";
import { ScrollArea, ScrollBar } from "../_components/ui/scroll-area";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import { db } from "../_lib/prisma";
import { transactionColumns } from "./_columns";

const TransactionsPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const userCanAddTransaction = await canUserAddTransaction();
  const transactions = await db.transaction.findMany({
    where: { userId },
    orderBy: { date: "desc" },
  });
  return (
    <div className="flex h-full flex-col space-y-4 p-4 md:space-y-6 md:p-6">
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold md:text-2xl">Transações</h1>
        <div className="w-full sm:w-auto">
          <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
        </div>
      </div>

      <div className="flex-1 overflow-hidden rounded-md border">
        <ScrollArea className="h-[700px] w-full">
          <div className="min-w-full">
            <DataTable
              columns={transactionColumns}
              data={JSON.parse(JSON.stringify(transactions))}
            />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default TransactionsPage;
