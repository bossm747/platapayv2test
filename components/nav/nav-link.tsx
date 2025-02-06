import Link from "next/link"
import { cn } from "@/lib/utils"
import { Route } from "./types"

interface NavLinkProps {
  route: Route
  pathname: string
  className?: string
  onClick?: () => void
}

export function NavLink({ route, pathname, className, onClick }: NavLinkProps) {
  return (
    <Link
      href={route.href}
      className={cn(
        className,
        "transition-colors",
        pathname === route.href 
          ? "text-primary bg-purple-100/50 rounded-md" 
          : "text-muted-foreground hover:text-primary hover:bg-purple-50/50 rounded-md"
      )}
      onClick={onClick}
    >
      <route.icon className="w-5 h-5 mb-1" />
      <span className="text-xs truncate">{route.label}</span>
    </Link>
  )
}
