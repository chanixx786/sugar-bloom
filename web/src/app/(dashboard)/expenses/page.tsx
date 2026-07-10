"use client";

import { useMemo, useState } from "react";
import { Wallet } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { PageHeader } from "@/components/ui/page-header";
import { Expense, INITIAL_EXPENSES } from "./mock-data";
import { getExpenseColumns } from "./columns";
import { ExpenseStats } from "./expense-stats";
import { ExpenseFilters, ExpensePeriod } from "./expense-filters";
import ExpenseModal from "./modal";

const NOW = new Date("2026-06-30T12:00:00Z");

function matchesPeriod(dateStr: string, period: ExpensePeriod): boolean {
  const created = new Date(dateStr);
  if (period === "month") {
    return (
      created.getFullYear() === NOW.getFullYear() && created.getMonth() === NOW.getMonth()
    );
  }
  if (period === "all") return true;
  // period === "7d"
  const diffDays = (NOW.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= 7;
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [period, setPeriod] = useState<ExpensePeriod>("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState<Expense | null>(null);

  const filteredExpenses = useMemo(() => {
    const q = search.toLowerCase().trim();
    return expenses.filter((expense) => {
      const matchesSearch =
        !q ||
        expense.exp_vendor.toLowerCase().includes(q) ||
        expense.inv_name.toLowerCase().includes(q);
      const matchesCategory =
        categoryFilter === "All" || expense.inv_category === categoryFilter;
      const matchesPeriodFilter = matchesPeriod(expense.exp_date_purchased, period);
      return matchesSearch && matchesCategory && matchesPeriodFilter;
    });
  }, [expenses, search, categoryFilter, period]);

  const stats = useMemo(() => {
    const totalSpent = filteredExpenses.reduce((sum, e) => sum + e.exp_amount, 0);
    const expenseCount = filteredExpenses.length;
    const avgExpense = expenseCount > 0 ? totalSpent / expenseCount : 0;
    const thisMonthSpent = expenses
      .filter((e) => matchesPeriod(e.exp_date_purchased, "month"))
      .reduce((sum, e) => sum + e.exp_amount, 0);

    return { totalSpent, expenseCount, avgExpense, thisMonthSpent };
  }, [filteredExpenses, expenses]);

  const handleEdit = (expense: Expense) => {
    setCurrentExpense(expense);
    setIsModalOpen(true);
  };

  const handleDelete = (expense: Expense) => {
    if (confirm(`Delete expense #${expense.exp_id} for "${expense.inv_name}"?`)) {
      setExpenses((prev) => prev.filter((e) => e.exp_id !== expense.exp_id));
      toast.success(`Expense #${expense.exp_id} removed.`);
    }
  };

  const handleSave = (savedExpense: Expense) => {
    setExpenses((prev) => {
      const exists = prev.some((e) => e.exp_id === savedExpense.exp_id);
      if (exists) {
        return prev.map((e) => (e.exp_id === savedExpense.exp_id ? savedExpense : e));
      }
      return [savedExpense, ...prev];
    });
    setIsModalOpen(false);
    toast.success(
      currentExpense
        ? `Expense #${savedExpense.exp_id} updated successfully.`
        : `Expense for "${savedExpense.inv_name}" recorded.`
    );
  };

  const columns = getExpenseColumns(handleEdit, handleDelete);

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in duration-300">
      <PageHeader
        title="Expenses"
        description="Track inventory purchases, vendor spending, and supply costs."
        icon={Wallet}
        buttonLabel="Record Expense"
        onButtonClick={() => {
          setCurrentExpense(null);
          setIsModalOpen(true);
        }}
      />

      <ExpenseStats
        totalSpent={stats.totalSpent}
        expenseCount={stats.expenseCount}
        avgExpense={stats.avgExpense}
        thisMonthSpent={stats.thisMonthSpent}
      />

      <Card className="rounded-[2rem] border-none shadow-md overflow-hidden bg-white py-0 gap-0 p-0">
        <CardContent className="p-6 space-y-6">
          <ExpenseFilters
            searchQuery={search}
            setSearchQuery={setSearch}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            period={period}
            setPeriod={setPeriod}
          />

          <DataTable
            columns={columns}
            data={filteredExpenses}
            pageSize={8}
            emptyMessage="No expenses match the selected filters."
          />
        </CardContent>
      </Card>

      <ExpenseModal
        expense={currentExpense}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-1">
      <p
        className="text-sm text-[oklch(0.55_0.08_350)]"
        style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
      >
        Welcome back, Christian! 👋
      </p>
    </div>
  );
}
