import Link from "next/link"
import { cn } from "@/lib/utils"
import { Route } from "./types"

interface NavLinkProps {
  route: Route
  pathname: string
  className?: string
  onClick?: () => void
}

export function NavLink({ route, pathname, className }: NavLinkProps) {
  return (
    <Link
      href={route.href}
      className={cn(
        className,
        "transition-colors",
        pathname === route.href ? "text-primary" : "text-muted-foreground"
      )}
      onClick={onClick}
    >
      <route.icon className="w-5 h-5 mb-1" />
      <span className="text-xs truncate">{route.label}</span>
    </Link>
  )
}
