"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  ClipboardList,
  FileText,
  TrendingUp,
  Wallet,
  PiggyBank,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// ─── Nav config ───────────────────────────────────────────────────────────────

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Products", href: "/products", icon: ShoppingCart },
  { label: "Inventory", href: "/inventory", icon: Package },
  { label: "Orders", href: "/orders", icon: ClipboardList },
  { label: "Reports", href: "/reports", icon: FileText },
  { label: "Sales", href: "/sales", icon: TrendingUp },
  { label: "Expenses", href: "/expenses", icon: Wallet },
  { label: "Budget", href: "/budget", icon: PiggyBank },
];

// ─── Nav Item ─────────────────────────────────────────────────────────────────

function NavItem({
  href,
  icon: Icon,
  label,
  active,
  onClick,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    // In collapsed mode: center the fixed-size link in the rail
    <SidebarMenuItem
      className={cn("list-none", collapsed && "flex justify-center")}
    >
      <Link
        href={href}
        onClick={onClick}
        title={collapsed ? label : undefined}
        className={cn(
          "group flex items-center rounded-xl text-sm font-medium",
          "transition-all duration-200 ease-in-out",

          // ── COLLAPSED: fixed square so active pill = idle pill ─────────
          collapsed
            ? "size-10 justify-center shrink-0" // 40×40 — roomier square for larger icon
            : "w-full gap-3 px-3 py-3", // balanced equal padding when expanded

          // ── IDLE ─────────────────────────────────────────────────────
          !active && [
            "text-[oklch(0.42_0.08_350)]",
            "hover:bg-[oklch(0.93_0.03_350)]",
            "hover:text-[oklch(0.32_0.13_350)]",
            "hover:shadow-[0_2px_8px_-2px_rgba(212,72,118,0.18)]",
          ],

          // ── ACTIVE ───────────────────────────────────────────────────
          active && [
            "bg-gradient-to-r from-[#d44876] to-[#f6bc9c]",
            "text-white",
            "shadow-[0_6px_18px_-4px_rgba(212,72,118,0.5)]",
            "hover:shadow-[0_8px_22px_-4px_rgba(212,72,118,0.65)]",
            "hover:scale-[1.04]",
            "active:scale-[0.97]",
          ],
        )}
      >
        <Icon
          className={cn(
            collapsed ? "size-5" : "size-[19px]",
            !active && "text-[oklch(0.62_0.15_350)] ",
            active && "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]",
          )}
          strokeWidth={1.75}
        />
        {!collapsed && (
          <span className="leading-none tracking-wide">{label}</span>
        )}
      </Link>
    </SidebarMenuItem>
  );
}

// ─── Sidebar inner content ────────────────────────────────────────────────────

function SidebarInner({ onNavClick }: { onNavClick?: () => void }) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  return (
    <>
      <SidebarContent className="px-3 py-2 ">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-3">
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  active={isActive(item.href)}
                  onClick={onNavClick}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ── Footer: Settings + User ── */}
      <SidebarFooter className="px-3 pb-4 pt-2 border-t border-border">
        <SidebarMenu className="gap-2">
          {/* Settings */}
          <NavItem
            href="/dashboard/settings"
            icon={Settings}
            label="Settings"
            active={isActive("/dashboard/settings")}
            onClick={onNavClick}
          />

          {/* User card */}
          <UserCard />
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}

// ─── User card (collapses to avatar-only) ────────────────────────────────────

function UserCard() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <SidebarMenuItem className="list-none">
      <div
        className={cn(
          "flex items-center mt-1 rounded-xl bg-[oklch(0.97_0.008_350)] transition-all duration-200",
          collapsed ? "justify-center p-2" : "gap-3 px-3 py-2.5",
        )}
      >
        <Avatar className="size-9 shrink-0">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="bg-gradient-to-br from-[#d44876] to-[#f6bc9c] text-white text-sm font-semibold">
            CH
          </AvatarFallback>
        </Avatar>
        {!collapsed && (
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-[oklch(0.3828_0.106_350.28)] truncate leading-tight">
              Christian
            </span>
            <span className="text-xs text-[oklch(0.55_0.08_350)] truncate leading-tight">
              Admin
            </span>
          </div>
        )}
      </div>
    </SidebarMenuItem>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function AppSidebar() {
  const { isMobile, setOpenMobile, state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const handleNavClick = () => {
    if (isMobile) setOpenMobile(false);
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border ">
      {/* ── Logo header ── */}
      <SidebarHeader
        className={cn(
          "px-4 py-4 transition-all duration-200",
          isCollapsed && "px-0",
        )}
      >
        <div
          className={cn(
            "flex items-center gap-0",
            isCollapsed && "justify-center",
          )}
        >
          <Image
            src="/assets/sbImage.png"
            alt="Sugar Bloom Logo"
            width={160}
            height={80}
            className="w-20 md:w-24 h-auto select-none"
            priority
          />
          {!isCollapsed && (
            <span className="font-dancing text-2xl text-primary font-bold">
              Sugar Bloom
            </span>
          )}
        </div>
      </SidebarHeader>

      <SidebarInner onNavClick={handleNavClick} />
      <SidebarRail />
    </Sidebar>
  );
}
