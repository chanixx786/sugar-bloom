"use client";

import type { ElementType } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, PieChart } from "lucide-react";
import { fmtMoney, SalesBreakdownItem } from "./sales-utils";

interface SalesBreakdownProps {
  paymentBreakdown: SalesBreakdownItem[];
  categoryBreakdown: SalesBreakdownItem[];
}

function BreakdownList({
  title,
  icon: Icon,
  items,
}: {
  title: string;
  icon: ElementType;
  items: SalesBreakdownItem[];
}) {
  const total = items.reduce((s, i) => s + i.value, 0);

  return (
    <Card className="rounded-[2rem] border-none shadow-md bg-white py-0 gap-0 flex-1">
      <CardHeader className="px-6 pt-6 pb-2">
        <CardTitle className="flex items-center gap-2">
          <Icon className="size-4 text-[#d44876]" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6 flex flex-col gap-4">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No data</p>
        ) : (
          items.map((item) => {
            const pct = total > 0 ? (item.value / total) * 100 : 0;
            return (
              <div key={item.label} className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-foreground">{item.label}</span>
                  <span className="font-bold text-[#d44876]">
                    ₱{fmtMoney(item.value)}
                    <span className="text-muted-foreground font-medium ml-1">
                      ({pct.toFixed(0)}%)
                    </span>
                  </span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all duration-500`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}

export function SalesBreakdown({ paymentBreakdown, categoryBreakdown }: SalesBreakdownProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <BreakdownList title="Payment Methods" icon={CreditCard} items={paymentBreakdown} />
      <BreakdownList title="Sales by Category" icon={PieChart} items={categoryBreakdown} />
    </div>
  );
}
