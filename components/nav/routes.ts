import { LayoutDashboard, Wallet, ArrowLeftRight, Users, Bell, Settings } from "lucide-react"
import { Route } from "./types"

export const routes: Route[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", roles: ["Admin", "Agent", "Cashier", "User"] },
  { label: "Wallet", icon: Wallet, href: "/wallet", roles: ["Admin", "Agent", "Cashier", "User"] },
  { label: "Transactions", icon: ArrowLeftRight, href: "/transactions", roles: ["Admin", "Agent", "Cashier", "User"] },
  { label: "Users", icon: Users, href: "/users", roles: ["Admin"] },
  { label: "Notifications", icon: Bell, href: "/notifications", roles: ["Admin", "Agent"] },
  { label: "Settings", icon: Settings, href: "/settings", roles: ["Admin", "Agent", "Cashier", "User"] },
]
