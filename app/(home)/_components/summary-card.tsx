import AddTransactionButton from "@/app/_components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";

interface SummaryCardProps {
  icon: React.ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
  userCanAddTransaction?: boolean;
}

const SummaryCard = ({
  icon,
  title,
  amount,
  size = "small",
  userCanAddTransaction,
}: SummaryCardProps) => {
  return (
    <Card className={`${size === "large" ? "bg-white/5" : ""}`}>
      <CardHeader className="flex-row items-center gap-2">
        {icon}
        <p
          className={
            size === "large" ? "text-white/70" : "text-muted-foreground"
          }
        >
          {title}
        </p>
      </CardHeader>
      <CardContent
        className={`flex ${size === "large" ? "flex-col gap-4 sm:flex-row sm:items-end sm:justify-between" : "justify-between"}`}
      >
        <p
          className={`font-bold ${size === "large" ? "text-2xl sm:text-3xl md:text-4xl" : "text-lg sm:text-xl md:text-2xl"}`}
        >
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </p>

        {size === "large" && (
          <div className="w-full sm:w-auto">
            <AddTransactionButton
              userCanAddTransaction={userCanAddTransaction}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
