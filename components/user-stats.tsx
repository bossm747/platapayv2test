"use client"

import { Users, UserCheck, UserPlus, UserX, Building2, ArrowLeftRight } from "lucide-react"
import { StatsCard } from "./stats-card"

interface UserStatsProps {
  totalUsers: number
  activeUsers: number
  newUsers: number
  inactiveUsers: number
  totalAgents: number
  totalTransactions: number
  growthStats?: {
    users: number
    active: number
    new: number
    inactive: number
    agents: number
    transactions: number
  }
}

export function UserStats({
  totalUsers,
  activeUsers,
  newUsers,
  inactiveUsers,
  totalAgents,
  totalTransactions,
  growthStats
}: UserStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <StatsCard
        title="Total Users"
        value={totalUsers}
        icon={Users}
        growth={growthStats?.users}
      />
      <StatsCard
        title="Active Users"
        value={activeUsers}
        icon={UserCheck}
        growth={growthStats?.active}
      />
      <StatsCard
        title="New Users"
        value={newUsers}
        icon={UserPlus}
        growth={growthStats?.new}
      />
      <StatsCard
        title="Inactive Users"
        value={inactiveUsers}
        icon={UserX}
        growth={growthStats?.inactive}
      />
      <StatsCard
        title="Total Agents"
        value={totalAgents}
        icon={Building2}
        growth={growthStats?.agents}
      />
      <StatsCard
        title="Total Transactions"
        value={totalTransactions}
        icon={ArrowLeftRight}
        growth={growthStats?.transactions}
      />
    </div>
  )
}
