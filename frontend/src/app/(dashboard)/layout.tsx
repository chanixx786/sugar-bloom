"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app_sidebar";
import TopBar from "@/components/sidebar/topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[oklch(0.99_0.004_70)]">
        <AppSidebar />

        <div className="flex flex-1 flex-col min-w-0 bg-background">
          <TopBar />
          <main className="flex-1 p-4 md:p-8">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
