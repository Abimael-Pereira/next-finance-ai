import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { Progress } from "@/app/_components/ui/progress";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { TRANSACTION_CATEGORY_LABELS } from "@/app/_constants/transaction";
import { TotalExpensePerCategory } from "@/app/_data/get-dashboard/types";

interface ExpensesPerCategoryProps {
  expensesPerCategory: TotalExpensePerCategory[];
}

const ExpensesPerCategory = ({
  expensesPerCategory,
}: ExpensesPerCategoryProps) => {
  return (
    <ScrollArea className="max-h-[300px] rounded-md border pb-6 md:max-h-[370px]">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-lg font-bold">
          Gastos por categoria
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 p-4 pt-0 md:space-y-6 md:p-6 md:pt-0">
        {expensesPerCategory && expensesPerCategory.length > 0 ? (
          expensesPerCategory.map((category: TotalExpensePerCategory) => (
            <div key={category.category} className="space-y-2">
              <div className="flex w-full justify-between">
                <p className="text-xs font-bold md:text-sm">
                  {
                    TRANSACTION_CATEGORY_LABELS[
                      category.category as keyof typeof TRANSACTION_CATEGORY_LABELS
                    ]
                  }
                </p>
                <p className="text-xs font-bold md:text-sm">
                  {category.percentageOfTotal}%
                </p>
              </div>
              <Progress value={category.percentageOfTotal} className="h-2" />
            </div>
          ))
        ) : (
          <p className="text-xs text-muted-foreground md:text-sm">
            Nenhum gasto nesse mês.
          </p>
        )}
      </CardContent>
    </ScrollArea>
  );
};

export default ExpensesPerCategory;
