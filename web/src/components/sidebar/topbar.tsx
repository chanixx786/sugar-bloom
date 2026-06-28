"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell } from "lucide-react";


export default function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex justify-between items-center gap-4 border-b border-[oklch(0.9_0.01_350)] bg-[oklch(0.99_0.004_70)] px-4 py-3 md:px-6">
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

    

      {/* Right side: avatar */}
    <div className="rounded-full bg-primary p-2">
        <Bell className="size-5 text-white" />
    </div>
    </header>
  );
}
