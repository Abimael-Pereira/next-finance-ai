import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }
  return <div className="flex h-full items-center justify-center"></div>;
};

export default HomePage;
