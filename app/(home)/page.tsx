import { auth } from "@clerk/nextjs/server";
import { isMatch } from "date-fns";
import { redirect } from "next/navigation";

import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";

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

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <TimeSelect />
      </div>
      <SummaryCards month={month} />
    </div>
  );
};

export default HomePage;
