import { Card } from "@/components/ui/card"
import { ArrowUp, ArrowDown } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  subtitle: string
}

export function MetricCard({ title, value, change, trend, subtitle }: MetricCardProps) {
  return (
    <Card className="p-4 bg-card border-border">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-xs font-medium text-muted-foreground">{title}</h3>
        <div
          className={`flex items-center gap-1 text-xs font-medium ${
            trend === "up" ? "text-chart-3" : "text-destructive"
          }`}
        >
          {trend === "up" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
          {change}
        </div>
      </div>
      <div className="text-2xl font-semibold text-foreground mb-1">{value}</div>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
    </Card>
  )
}
