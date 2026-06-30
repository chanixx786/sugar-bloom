"use client";

import { useMemo, useState } from "react";
import { TrendingUp, Download } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { PageHeader } from "@/components/ui/page-header";
import { INITIAL_ORDERS } from "../orders/mock-data";
import { SalesStats } from "./sales-stats";
import { SalesFilters } from "./sales-filters";
import { SalesChart } from "./sales-chart";
import { SalesBreakdown } from "./sales-breakdown";
import { TopProducts } from "./top-products";
import { getSalesColumns } from "./columns";
import {
  SalesPeriod,
  SalesTypeFilter,
  filterSalesOrders,
  computeSalesStats,
  computeDailyRevenue,
  computeMonthlyRevenue,
  computeTopProducts,
  computePaymentBreakdown,
  computeCategoryBreakdown,
} from "./sales-utils";

export default function SalesPage() {
  const [period, setPeriod] = useState<SalesPeriod>("30d");
  const [typeFilter, setTypeFilter] = useState<SalesTypeFilter>("All");

  const filteredOrders = useMemo(
    () => filterSalesOrders(INITIAL_ORDERS, period, typeFilter),
    [period, typeFilter]
  );

  const stats = useMemo(() => computeSalesStats(filteredOrders), [filteredOrders]);
  const chartGranularity = period === "all" ? "monthly" : "daily";
  const chartData = useMemo(
    () =>
      chartGranularity === "monthly"
        ? computeMonthlyRevenue(filteredOrders)
        : computeDailyRevenue(filteredOrders),
    [filteredOrders, chartGranularity]
  );
  const topProducts = useMemo(() => computeTopProducts(filteredOrders), [filteredOrders]);
  const paymentBreakdown = useMemo(
    () => computePaymentBreakdown(filteredOrders),
    [filteredOrders]
  );
  const categoryBreakdown = useMemo(
    () => computeCategoryBreakdown(filteredOrders),
    [filteredOrders]
  );

  const columns = useMemo(() => getSalesColumns(), []);

  const handleExport = () => {
    toast.success("Sales report export will be available soon.");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sales"
        description="Track revenue, analyze trends, and review paid transactions across your bakery."
        icon={TrendingUp}
        buttonLabel="Export Report"
        onButtonClick={handleExport}
      />

      <SalesStats
        totalRevenue={stats.totalRevenue}
        totalOrders={stats.totalOrders}
        avgOrderValue={stats.avgOrderValue}
        walkinCount={stats.walkinCount}
        onlineCount={stats.onlineCount}
      />

      <Card className="rounded-[2rem] border-none shadow-md overflow-hidden bg-white py-0 gap-0 p-0">
        <CardContent className="p-6 space-y-6">
          <SalesFilters
            period={period}
            onPeriodChange={setPeriod}
            typeFilter={typeFilter}
            onTypeFilterChange={setTypeFilter}
          />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div className="xl:col-span-2">
              <SalesChart data={chartData} granularity={chartGranularity} />
            </div>
            <TopProducts products={topProducts} />
          </div>

          <SalesBreakdown
            paymentBreakdown={paymentBreakdown}
            categoryBreakdown={categoryBreakdown}
          />

          <div>
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <Download className="size-4 text-[#d44876]" />
              Recent Transactions
            </h3>
            <DataTable
              columns={columns}
              data={filteredOrders}
              pageSize={6}
              emptyMessage="No paid sales match the selected filters."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
