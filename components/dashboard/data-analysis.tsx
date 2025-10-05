"use client"

import { Card } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { category: "Microgravity", consumed: 21.87, saved: 11.01 },
  { category: "Radiation", consumed: 18.45, saved: 9.32 },
  { category: "Plant Biology", consumed: 15.23, saved: 8.76 },
  { category: "Cell Culture", consumed: 12.89, saved: 7.45 },
  { category: "Materials", consumed: 10.34, saved: 6.21 },
  { category: "Astrobiology", consumed: 8.92, saved: 5.18 },
]

export function DataAnalysis() {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground mb-1">Data Analysis by Category</h2>
        <p className="text-sm text-muted-foreground">GB-Hours consumed vs. saved across research areas</p>
      </div>

      <div className="flex items-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Consumed</span>
          <span className="text-sm font-semibold text-foreground">87.7 GB-hrs</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent" />
          <span className="text-sm text-muted-foreground">Saved</span>
          <span className="text-sm font-semibold text-foreground">47.9 GB-hrs</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis
            dataKey="category"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              color: "hsl(var(--foreground))",
            }}
          />
          <Bar dataKey="consumed" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          <Bar dataKey="saved" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
