"use client"

import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LogOut } from "lucide-react"
import { NavLink } from "./nav-link"
import { Route } from "./types"

interface DesktopNavProps {
  routes: Route[]
  onLogout: () => void
}

export function DesktopNav({ routes, onLogout }: DesktopNavProps) {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r bg-white/80 backdrop-blur-sm transition-transform md:translate-x-0 md:flex md:flex-col">
      <div className="flex h-16 items-center justify-center border-b px-4">
        <h1 className="text-2xl font-bold">PlataPay</h1>
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-2 p-4">
          {routes.map((route) => (
            <NavLink
              key={route.href}
              route={route}
              pathname={pathname}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-colors hover:bg-muted"
            />
          ))}
        </nav>
      </ScrollArea>
      <div className="border-t p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 rounded-lg px-3 py-2 text-base transition-colors hover:bg-destructive/10 hover:text-destructive"
          onClick={onLogout}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </aside>
  )
}
