"use client";

import { PhilippinePeso, Receipt, Store, CalendarDays } from "lucide-react";
import { StatsGrid } from "@/components/ui/stat-card";

const fmtMoney = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

interface ExpenseStatsProps {
  totalSpent: number;
  expenseCount: number;
  avgExpense: number;
  thisMonthSpent: number;
}

export function ExpenseStats({
  totalSpent,
  expenseCount,
  avgExpense,
  thisMonthSpent,
}: ExpenseStatsProps) {
  return (
    <StatsGrid
      stats={[
        {
          label: "Total Spent",
          value: `₱${fmtMoney(totalSpent)}`,
          icon: PhilippinePeso,
        },
        {
          label: "Total Expenses",
          value: expenseCount,
          icon: Receipt,
        },
        {
          label: "Avg per Expense",
          value: `₱${fmtMoney(avgExpense)}`,
          icon: Store,
        },
        {
          label: "This Month",
          value: `₱${fmtMoney(thisMonthSpent)}`,
          icon: CalendarDays,
        },
      ]}
    />
  );
}
