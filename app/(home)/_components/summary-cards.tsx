import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";

import { db } from "@/app/_lib/prisma";

import SummaryCard from "./summary-card";

interface SummaryCardsProps {
  month: string;
}

const SummaryCards = async ({ month }: SummaryCardsProps) => {
  const where = {
    date: {
      gte: new Date(`2025-${month}-01`),
      lt: new Date(`2025-${month}-31`),
    },
  };
  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )._sum.amount ?? 0,
  );

  const revenueTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )._sum.amount ?? 0,
  );

  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )._sum.amount ?? 0,
  );

  const balance = revenueTotal - investmentsTotal - expensesTotal;

  return (
    <div className="space-y-6">
      <SummaryCard
        amount={balance}
        icon={<WalletIcon size={16} />}
        size="large"
        title="Saldo"
      />

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          amount={investmentsTotal}
          icon={
            <PiggyBankIcon
              size={26}
              className="rounded-md bg-primary/15 p-[6px] text-muted-foreground"
            />
          }
          title="Investido"
        />
        <SummaryCard
          amount={revenueTotal}
          icon={
            <TrendingUpIcon
              size={26}
              className="rounded-md bg-primary/15 p-[6px] text-primary"
            />
          }
          title="Receita"
        />
        <SummaryCard
          amount={expensesTotal}
          icon={
            <TrendingDownIcon
              size={26}
              className="rounded-md bg-red-500/15 p-[6px] text-red-500"
            />
          }
          title="Despesas"
        />
      </div>
    </div>
  );
};

export default SummaryCards;
