import { auth } from "@clerk/nextjs/server";
import { isMatch } from "date-fns";
import { redirect } from "next/navigation";

import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
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

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <TimeSelect />
      </div>
      <div className="grid grid-cols-[2fr,1fr]">
        <div className="flex flex-col gap-6">
          <SummaryCards {...dashboard} />
          <div className="grid grid-cols-3 grid-rows-1 gap-6">
            <TransactionPieChart {...dashboard} />
            <ExpensesPerCategory
              expensesPerCategory={dashboard.totalExpensePerCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
