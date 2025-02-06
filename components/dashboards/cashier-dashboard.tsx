import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { User } from "@/lib/auth-context"
import { ArrowUpRight, ArrowDownRight, DollarSign, CreditCard } from "lucide-react"

interface CashierDashboardProps {
  user: User
}

export function CashierDashboard({ user }: CashierDashboardProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Welcome, {user.username}</h1>
      <p className="text-muted-foreground">Cashier Dashboard</p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">+5 in the last hour</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱23,456</div>
            <p className="text-xs text-muted-foreground">+₱3,456 since yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cash In</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱12,345</div>
            <p className="text-xs text-muted-foreground">+₱2,345 today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cash Out</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱11,111</div>
            <p className="text-xs text-muted-foreground">-₱1,111 today</p>
          </CardContent>
        </Card>
      </div>
      {/* Add more cashier-specific content here */}
    </div>
  )
}

