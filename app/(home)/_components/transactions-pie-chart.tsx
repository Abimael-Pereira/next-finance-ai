"use client";

import { TransactionType } from "@prisma/client";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { TransactionPercentagePerType } from "@/app/_data/get-dashboard/types";

import PercentageItem from "./percentage-item";

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Investido",
    color: "#FFFFFF",
  },
  [TransactionType.DEPOSIT]: {
    label: "Receita",
    color: "#55B02E",
  },
  [TransactionType.EXPENSE]: {
    label: "Despesas",
    color: "#E93030",
  },
} satisfies ChartConfig;

interface TransactionPieChartProps {
  revenueTotal: number;
  expensesTotal: number;
  investmentsTotal: number;
  typesPercentage: TransactionPercentagePerType;
}

const TransactionPieChart = ({
  revenueTotal,
  expensesTotal,
  investmentsTotal,
  typesPercentage,
}: TransactionPieChartProps) => {
  const chartData = [
    { type: TransactionType.DEPOSIT, amount: revenueTotal, fill: "#55B02E" },
    { type: TransactionType.EXPENSE, amount: expensesTotal, fill: "#E93030" },
    {
      type: TransactionType.INVESTMENT,
      amount: investmentsTotal,
      fill: "#FFFFFF",
    },
  ];
  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 p-4 md:p-6">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[200px] md:max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={40}
              className="md:innerRadius-[60]"
            />
          </PieChart>
        </ChartContainer>

        <div className="mt-4 space-y-2 md:mt-6">
          <PercentageItem
            icon={
              <TrendingUpIcon
                size={20}
                className="rounded-md bg-primary/15 p-1 text-primary md:size-[26px] md:p-[6px]"
              />
            }
            title="Receita"
            value={typesPercentage[TransactionType.DEPOSIT]}
          />

          <PercentageItem
            icon={
              <TrendingDownIcon
                size={20}
                className="rounded-md bg-red-500/15 p-1 text-muted-foreground text-red-500 md:size-[26px] md:p-[6px]"
              />
            }
            title="Despesas"
            value={typesPercentage[TransactionType.EXPENSE]}
          />

          <PercentageItem
            icon={
              <PiggyBankIcon
                size={20}
                className="rounded-md bg-white/15 p-1 text-muted-foreground md:size-[26px] md:p-[6px]"
              />
            }
            title="Investido"
            value={typesPercentage[TransactionType.INVESTMENT]}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionPieChart;
