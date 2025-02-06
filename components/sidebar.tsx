"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  Users,
  Settings,
  Bell,
  PieChart,
  HelpCircle,
  LogOut,
} from "lucide-react"

const routes = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "Wallet", icon: Wallet, href: "/wallet" },
  { label: "Transactions", icon: ArrowLeftRight, href: "/transactions" },
  { label: "Users", icon: Users, href: "/users" },
  { label: "Notifications", icon: Bell, href: "/notifications" },
  { label: "Analytics", icon: PieChart, href: "/analytics" },
  { label: "Settings", icon: Settings, href: "/settings" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-[200px] flex-col border-r bg-muted/5">
      <div className="flex-1 space-y-1 p-4">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted",
              pathname === route.href ? "bg-muted" : "",
            )}
          >
            <route.icon className="h-4 w-4" />
            {route.label}
          </Link>
        ))}
      </div>
      <div className="border-t p-4 space-y-1">
        <Link
          href="/help"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted"
        >
          <HelpCircle className="h-4 w-4" />
          Help & Support
        </Link>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-500 transition-colors hover:bg-red-500/10">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  )
}

