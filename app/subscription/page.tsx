import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const SubscriptionPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }
  return <h1>Subscription Page</h1>;
};

export default SubscriptionPage;
