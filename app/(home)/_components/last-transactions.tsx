import { Transaction } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/app/_components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { TRANSACTION_PAYMENT_METHOD_ICONS } from "@/app/_constants/transaction";
import { formatCurrency } from "@/app/utils/currency";

interface LastTransactionsProps {
  lastTransactions: Transaction[];
}

const LastTransactions = ({ lastTransactions }: LastTransactionsProps) => {
  const getAmountColor = (transaction: Transaction) => {
    if (transaction.type === "EXPENSE") {
      return "text-red-500";
    }
    if (transaction.type === "DEPOSIT") {
      return "text-primary";
    }
    return "text-white";
  };

  const getAmountPrefix = (transaction: Transaction) => {
    if (transaction.type === "DEPOSIT") {
      return "+ ";
    }
    return "- ";
  };

  return (
    <ScrollArea className="max-h-[400px] rounded-md border lg:max-h-[688px]">
      <CardHeader className="flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle className="text-lg font-bold">Últimas transações</CardTitle>
        <Button
          variant="outline"
          className="w-full rounded-full font-bold sm:w-auto"
        >
          <Link href="/transactions">Ver mais</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6">
        {lastTransactions.length > 0 ? (
          lastTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between gap-2"
            >
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <div className="rounded-lg bg-white/5 p-2 md:p-3">
                  <Image
                    src={
                      TRANSACTION_PAYMENT_METHOD_ICONS[
                        transaction.paymentMethod
                      ]
                    }
                    height={16}
                    width={16}
                    alt="Payment method"
                    className="md:h-5 md:w-5"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">
                    {transaction.name}
                  </p>
                  <p className="text-xs text-muted-foreground md:text-sm">
                    {new Date(transaction.date).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <p
                className={`text-xs font-bold md:text-sm ${getAmountColor(transaction)}`}
              >
                {getAmountPrefix(transaction)}{" "}
                {formatCurrency(Number(transaction.amount))}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">Nenhuma transação</p>
        )}
      </CardContent>
    </ScrollArea>
  );
};

export default LastTransactions;
