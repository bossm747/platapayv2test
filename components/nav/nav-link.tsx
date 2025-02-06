import Link from "next/link"
import { cn } from "@/lib/utils"
import { Route } from "./types"

interface NavLinkProps {
  route: Route
  pathname: string
  className?: string
}

export function NavLink({ route, pathname, className }: NavLinkProps) {
  return (
    <Link
      href={route.href}
      className={cn(
        className,
        pathname === route.href ? "text-primary" : "text-muted-foreground"
      )}
    >
      <route.icon className="w-5 h-5 mb-1" />
      <span className="text-xs">{route.label}</span>
    </Link>
  )
}
