"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Menu, LogOut } from "lucide-react"
import { NavLink } from "./nav-link"
import { Route } from "./types"

interface MobileNavProps {
  routes: Route[]
  onLogout: () => void
}

export function MobileNav({ routes, onLogout }: MobileNavProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 z-40 w-full h-16 bg-background border-t md:hidden">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        {routes.slice(0, 4).map((route) => (
          <NavLink
            key={route.href}
            route={route}
            pathname={pathname}
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-muted"
          />
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
                {routes.map((route) => (
                  <NavLink
                    key={route.href}
                    route={route}
                    pathname={pathname}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-base hover:bg-muted"
                    onClick={() => setOpen(false)}
                  />
                ))}
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-colors hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => {
                    onLogout()
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
  )
}
