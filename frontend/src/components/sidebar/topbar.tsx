"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Map route segments → display title
const PAGE_TITLES: Record<string, string> = {
  "/dashboard":           "Dashboard",
  "/products":  "Products",
  "/inventory": "Inventory",
  "/orders":    "Orders",
  "/reports":   "Reports",
  "/sales":     "Sales",
  "/expenses":  "Expenses",
  "/budget":    "Budget",
  "/settings":  "Settings",
};

const PAGE_DESCRIPTIONS: Record<string, string> = {
  "/dashboard":           "Welcome back, Christian! Here's what's happening today.",
  "/products":  "Manage your product catalog and pricing.",
  "/inventory": "Track stock levels and reorder thresholds.",
  "/orders":    "View and manage customer orders.",
  "/reports":   "Analyze sales trends and performance.",
  "/sales":     "Monitor your revenue and transactions.",
  "/expenses":  "Record and review your business expenses.",
  "/budget":    "Plan and track your financial budgets.",
  "/settings":  "Configure your account and preferences.",
};

export default function TopBar() {
  const pathname = usePathname();

  const matchRoute = (map: Record<string, string>) =>
    Object.entries(map)
      .sort((a, b) => b[0].length - a[0].length)
      .find(([key]) => pathname === key || pathname.startsWith(key + "/"))?.[1];

  const title       = matchRoute(PAGE_TITLES)       ?? "Dashboard";
  const description = matchRoute(PAGE_DESCRIPTIONS) ?? "";

  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-[oklch(0.9_0.01_350)] bg-[oklch(0.99_0.004_70)] px-4 py-3 md:px-6">
      {/* Hamburger / collapse toggle */}
      <SidebarTrigger
        className="
          inline-flex items-center justify-center rounded-lg
          p-2 text-[oklch(0.45_0.1_350)]
          hover:bg-[oklch(0.95_0.01_350)] hover:text-[oklch(0.35_0.12_350)]
          transition-colors duration-150
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d44876]/40
        "
      />

      {/* Title + description */}
      <div
        className="flex flex-col flex-1 min-w-0"
        style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
      >
        <h1 className=" text-xl font-semibold leading-tight tracking-tight  truncate">
          {title}
        </h1>
        {description && (
          <p className="text-xs text-[oklch(0.58_0.06_350)] leading-tight truncate mt-0.5">
            {description}
          </p>
        )}
      </div>

      {/* Right side: avatar */}
      <Avatar className="size-9 shrink-0 cursor-pointer ring-2 ring-[oklch(0.9_0.01_350)] hover:ring-[#d44876]/40 transition-all duration-150">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback className="bg-gradient-to-br from-[#d44876] to-[#f6bc9c] text-white text-sm font-semibold">
          CH
        </AvatarFallback>
      </Avatar>
    </header>
  );
}
