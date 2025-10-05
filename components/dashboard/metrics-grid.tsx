"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Activity, Database, Satellite, Zap } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function MetricsGrid() {
  const { language } = useLanguage()

  const metrics = [
    {
      label: language === "es" ? "Misiones Activas" : "Active Missions",
      value: "12",
      change: "+2",
      trend: "up",
      icon: Satellite,
    },
    {
      label: language === "es" ? "Puntos de Datos Recolectados" : "Data Points Collected",
      value: "2.4M",
      change: "+18.2%",
      trend: "up",
      icon: Database,
    },
    {
      label: language === "es" ? "Artículos de Investigación" : "Research Papers",
      value: "608",
      change: "+45",
      trend: "up",
      icon: Activity,
    },
    {
      label: language === "es" ? "Velocidad de Procesamiento" : "Processing Speed",
      value: "352.7 KB/s",
      change: "-0.1%",
      trend: "down",
      icon: Zap,
    },
  ]
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon
        const isPositive = metric.trend === "up"

        return (
          <Card key={metric.label} className="p-6 bg-card border-border">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                <p className="text-3xl font-bold text-foreground mb-2">{metric.value}</p>
                <div className="flex items-center gap-1">
                  {isPositive ? (
                    <TrendingUp className="w-4 h-4 text-accent" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-destructive" />
                  )}
                  <span
                    className={isPositive ? "text-accent text-sm font-medium" : "text-destructive text-sm font-medium"}
                  >
                    {metric.change}
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <Icon className="w-5 h-5 text-primary" />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
