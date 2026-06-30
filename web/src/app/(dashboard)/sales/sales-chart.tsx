"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { DailyRevenue, fmtMoney } from "./sales-utils";

interface SalesChartProps {
  data: DailyRevenue[];
  granularity?: "daily" | "monthly";
}

export function SalesChart({ data, granularity = "daily" }: SalesChartProps) {
  const maxRevenue = Math.max(...data.map((d) => d.revenue), 1);

  return (
    <Card className="rounded-[2rem] border-none shadow-md bg-white py-0 gap-0">
      <CardHeader className="px-6 pt-6 pb-2">
        <CardTitle className=" flex items-center gap-2">
          <BarChart3 className="size-4 text-[#d44876]" />
          {granularity === "monthly" ? "Monthly Revenue" : "Daily Revenue"}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8 text-center">
            No sales data for the selected period.
          </p>
        ) : (
          <div className="flex items-end justify-between gap-4 h-48 pt-4">
            {data.map((day) => {
              const height = (day.revenue / maxRevenue) * 100;
              return (
                <div key={day.date} className="flex flex-1 flex-col items-center gap-2 min-w-0">
                  <span className="text-[10px] font-bold text-[#d44876]">
                    ₱{fmtMoney(day.revenue)}
                  </span>
                  <div className="w-full flex justify-center h-32 items-end">
                    <div
                      className="w-full max-w-12 rounded-t-xl bg-gradient-to-t from-[#d44876] to-[#f6bc9c] transition-all duration-500 shadow-[0_4px_14px_-4px_rgba(212,72,118,0.35)]"
                      style={{ height: `${Math.max(height, 8)}%` }}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-semibold text-foreground truncate w-full">
                      {day.label}
                    </p>
                    <p className="text-[9px] text-muted-foreground">
                      {day.orders} {day.orders === 1 ? "order" : "orders"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
