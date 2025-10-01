import { auth, clerkClient } from "@clerk/nextjs/server";
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
  const user = await clerkClient().users.getUser(userId);

  return (
    <div className="flex h-full flex-col space-y-4 overflow-hidden p-4 md:space-y-6 md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold md:text-2xl">Dashboard</h1>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <TimeSelect />
          <AiReportButton
            month={month}
            hasPremiumPlan={user.publicMetadata.subscriptionPlan === "premium"}
          />
        </div>
      </div>

      {/* Layout responsivo: empilhado no mobile, lado a lado no desktop */}
      <div className="flex flex-1 flex-col gap-4 overflow-hidden md:gap-6 lg:grid lg:grid-cols-[2fr,1fr]">
        <div className="flex flex-col gap-4 overflow-hidden md:gap-6">
          <SummaryCards
            {...dashboard}
            userCanAddTransaction={userCanAddTransaction}
          />

          {/* Charts responsivos */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            <div className="md:col-span-2 lg:col-span-1">
              <TransactionPieChart {...dashboard} />
            </div>
            <div className="md:col-span-2 lg:col-span-2">
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
        </div>

        <div className="max-h-96 lg:max-h-none">
          <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
