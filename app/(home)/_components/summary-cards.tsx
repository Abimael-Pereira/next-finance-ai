import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";

import SummaryCard from "./summary-card";

interface SummaryCardsProps {
  balance: number;
  investmentsTotal: number;
  revenueTotal: number;
  expensesTotal: number;
}

const SummaryCards = async ({
  balance,
  investmentsTotal,
  revenueTotal,
  expensesTotal,
}: SummaryCardsProps) => {
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
              className="rounded-md bg-white/15 p-[6px] text-muted-foreground"
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
