"use client"

import { useAuth } from "@/lib/auth-context"
import { MobileNav } from "./nav/mobile-nav"
import { DesktopNav } from "./nav/desktop-nav"
import { routes } from "./nav/routes"

export function ResponsiveNav() {
  const { user, logout } = useAuth()
  
  const filteredRoutes = routes.filter((route) => user && route.roles.includes(user.role))

  return (
    <>
      <MobileNav routes={filteredRoutes} onLogout={logout} />
      <DesktopNav routes={filteredRoutes} onLogout={logout} />
    </>
  )
}
