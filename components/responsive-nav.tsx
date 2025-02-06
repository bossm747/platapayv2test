"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { LayoutDashboard, Wallet, ArrowLeftRight, Users, Bell, Settings, Menu, LogOut } from "lucide-react"

const routes = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", roles: ["Admin", "Agent", "Cashier", "User"] },
  { label: "Wallet", icon: Wallet, href: "/wallet", roles: ["Admin", "Agent", "Cashier", "User"] },
  { label: "Transactions", icon: ArrowLeftRight, href: "/transactions", roles: ["Admin", "Agent", "Cashier", "User"] },
  { label: "Users", icon: Users, href: "/users", roles: ["Admin"] },
  { label: "Notifications", icon: Bell, href: "/notifications", roles: ["Admin", "Agent"] },
  { label: "Settings", icon: Settings, href: "/settings", roles: ["Admin", "Agent", "Cashier", "User"] },
]

export function ResponsiveNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()

  const filteredRoutes = routes.filter((route) => user && route.roles.includes(user.role))

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t md:hidden">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          {filteredRoutes.slice(0, 4).map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "inline-flex flex-col items-center justify-center px-5 hover:bg-muted",
                pathname === route.href ? "text-primary" : "text-muted-foreground",
              )}
            >
              <route.icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{route.label}</span>
            </Link>
          ))}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="inline-flex flex-col items-center justify-center px-5 hover:bg-muted">
                <Menu className="w-5 h-5 mb-1" />
                <span className="text-xs">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <ScrollArea className="h-[calc(100vh-8rem)] pb-10">
                <div className="flex flex-col gap-4 py-4">
                  {filteredRoutes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-colors hover:bg-muted",
                        pathname === route.href ? "bg-muted" : "",
                      )}
                      onClick={() => setOpen(false)}
                    >
                      <route.icon className="w-5 h-5" />
                      {route.label}
                    </Link>
                  ))}
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-colors hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => {
                      logout()
                      setOpen(false)
                    }}
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </Button>
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r bg-background transition-transform md:translate-x-0 md:flex md:flex-col">
        <div className="flex h-16 items-center justify-center border-b px-4">
          <h1 className="text-2xl font-bold">PlataPay</h1>
        </div>
        <ScrollArea className="flex-1">
          <nav className="flex flex-col gap-2 p-4">
            {filteredRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-colors hover:bg-muted",
                  pathname === route.href ? "bg-muted" : "",
                )}
              >
                <route.icon className="w-5 h-5" />
                {route.label}
              </Link>
            ))}
          </nav>
        </ScrollArea>
        <div className="border-t p-4">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 rounded-lg px-3 py-2 text-base transition-colors hover:bg-destructive/10 hover:text-destructive"
            onClick={logout}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  )
}

"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, X, Home, Users, Wallet, FileText, Settings, LogOut } from "lucide-react"

const routes = [
  {
    label: 'Dashboard',
    icon: Home,
    href: '/dashboard',
    color: 'text-sky-500',
  },
  {
    label: 'Users',
    icon: Users,
    href: '/users',
    color: 'text-violet-500',
  },
  {
    label: 'Wallet',
    icon: Wallet,
    href: '/wallet',
    color: 'text-pink-700',
  },
  {
    label: 'Transactions',
    icon: FileText,
    href: '/transactions',
    color: 'text-orange-700',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
    color: 'text-gray-500',
  }
]

export function ResponsiveNav() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  return (
    <>
      {/* Mobile Navigation */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden fixed top-4 left-4 z-40">
          <Button variant="outline" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 bg-white p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle className="text-2xl font-bold text-purple-900">PlataPay</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 p-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900",
                  pathname === route.href ? "bg-purple-50 text-purple-900" : ""
                )}
              >
                <route.icon className={cn("h-5 w-5", route.color)} />
                {route.label}
              </Link>
            ))}
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3 mt-auto"
              onClick={() => {
                localStorage.removeItem("auth_token")
                window.location.href = "/login"
              }}
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex flex-col gap-1 fixed w-64 h-full bg-white border-r p-4">
        <div className="pb-4 border-b">
          <h1 className="text-2xl font-bold text-purple-900">PlataPay</h1>
        </div>
        <div className="flex flex-col gap-1 py-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900",
                pathname === route.href ? "bg-purple-50 text-purple-900" : ""
              )}
            >
              <route.icon className={cn("h-5 w-5", route.color)} />
              {route.label}
            </Link>
          ))}
        </div>
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 mt-auto"
          onClick={() => {
            localStorage.removeItem("auth_token")
            window.location.href = "/login"
          }}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </nav>
    </>
  )
}
