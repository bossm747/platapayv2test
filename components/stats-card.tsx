import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: number
  icon: LucideIcon
  growth?: number
  className?: string
}

export function StatsCard({ title, value, icon: Icon, growth, className }: StatsCardProps) {
  const formattedValue = new Intl.NumberFormat('en-US').format(value)
  
  return (
    <Card className={cn("p-6 bg-white/80 backdrop-blur-sm", className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{formattedValue}</h3>
          {growth !== undefined && (
            <p className={cn(
              "text-sm mt-2",
              growth >= 0 ? "text-green-600" : "text-red-600"
            )}>
              {growth >= 0 ? "+" : ""}{growth}% from last month
            </p>
          )}
        </div>
        <div className="p-3 bg-purple-50 rounded-lg">
          <Icon className="w-8 h-8 text-purple-900" />
        </div>
      </div>
    </Card>
  )
}
