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
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null // This will prevent a flash of content before redirecting
  }

  const DashboardComponent =
    {
      Admin: AdminDashboard,
      Agent: AgentDashboard,
      Cashier: CashierDashboard,
      User: UserDashboard,
    }[user.role] || UserDashboard

  return <DashboardComponent user={user} />
}

"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

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
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin text-purple-900">⚪</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-purple-900">
        {user.role} Dashboard
      </h1>
      {/* Dashboard content */}
    </div>
  )
}
