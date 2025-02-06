"use client"

import { useAuth } from "@/lib/auth-context"
import { AdminDashboard } from "@/components/dashboards/admin-dashboard"
import { AgentDashboard } from "@/components/dashboards/agent-dashboard"
import { CashierDashboard } from "@/components/dashboards/cashier-dashboard"
import { UserDashboard } from "@/components/dashboards/user-dashboard"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-purple-900" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  const DashboardComponent =
    {
      Admin: AdminDashboard,
      Agent: AgentDashboard,
      Cashier: CashierDashboard,
    }[user.role]

  if (!DashboardComponent) {
    router.replace("/login")
    return null
  }

  return <DashboardComponent user={user} />
}
