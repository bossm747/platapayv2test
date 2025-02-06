import { ElementType } from "react"

export interface Route {
  label: string
  icon: ElementType
  href: string
  roles: string[]
}
