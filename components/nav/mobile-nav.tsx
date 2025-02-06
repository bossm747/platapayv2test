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
    <>
      <nav className="fixed top-0 left-0 z-40 w-full h-16 bg-gradient-to-r from-purple-900 to-purple-700 border-b border-purple-100 shadow-sm md:hidden">
        <div className="flex items-center justify-between h-full px-4">
          <h1 className="text-xl font-bold text-white">PlataPay</h1>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="hover:bg-purple-50/50 rounded-md"
              >
                <Menu className="w-6 h-6 text-muted-foreground hover:text-primary" />
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
      <nav className="fixed bottom-0 left-0 z-40 w-full h-16 bg-white/80 backdrop-blur-sm border-t border-purple-100 shadow-lg md:hidden">
        <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium bg-gradient-to-r from-purple-100/50 to-white/50">
          {routes.slice(0, 4).map((route) => (
            <NavLink
              key={route.href}
              route={route}
              pathname={pathname}
              className="inline-flex flex-col items-center justify-center px-5 hover:bg-muted"
            />
          ))}
        </div>
      </nav>
    </>
  )
}
