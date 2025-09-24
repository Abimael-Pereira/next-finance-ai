import { auth } from "@clerk/nextjs/server";
import { isMatch } from "date-fns";
import { redirect } from "next/navigation";

import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import { getDashboard } from "../_data/get-dashboard";
import AiReportButton from "./_components/ai-report-button";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import TransactionPieChart from "./_components/transactions-pie-chart";

interface HomePageProps {
  searchParams: {
    month: string;
  };
}

const HomePage = async ({ searchParams: { month } }: HomePageProps) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const monthIsInvalid = !month || !isMatch(month, "MM");

  if (monthIsInvalid) {
    redirect(
      "/?month=" + (new Date().getMonth() + 1).toString().padStart(2, "0"),
    );
  }

  const dashboard = await getDashboard(month);
  const userCanAddTransaction = await canUserAddTransaction();

  return (
    <div className="flex h-full flex-col space-y-6 overflow-hidden p-6">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <AiReportButton month={month} />
          <TimeSelect />
        </div>
      </div>
      <div className="grid h-full grid-cols-[2fr,1fr] gap-6 overflow-hidden">
        <div className="flex flex-col gap-6 overflow-hidden">
          <SummaryCards
            {...dashboard}
            userCanAddTransaction={userCanAddTransaction}
          />
          <div className="grid grid-cols-3 grid-rows-1 gap-6">
            <TransactionPieChart {...dashboard} />
            <ExpensesPerCategory
              expensesPerCategory={dashboard.totalExpensePerCategory}
            />
          </div>
        </div>

        <LastTransactions lastTransactions={dashboard.lastTransactions} />
      </div>
    </div>
  );
};

export default HomePage;
