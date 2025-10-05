"use client"

import { Card } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { time: "00:00", requests: 2100, errors: 12 },
  { time: "02:00", requests: 1950, errors: 8 },
  { time: "04:00", requests: 1800, errors: 15 },
  { time: "06:00", requests: 2200, errors: 10 },
  { time: "08:00", requests: 2400, errors: 5 },
  { time: "10:00", requests: 2300, errors: 7 },
  { time: "12:00", requests: 2100, errors: 9 },
]

export function ResearchActivity() {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground mb-1">Research Activity</h2>
        <p className="text-sm text-muted-foreground">Data collection requests over time</p>
      </div>

      <div className="flex items-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Requests</span>
          <span className="text-sm font-semibold text-foreground">289K</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive" />
          <span className="text-sm text-muted-foreground">Errors</span>
          <span className="text-sm font-semibold text-foreground">0.2%</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              color: "hsl(var(--foreground))",
            }}
          />
          <Line type="monotone" dataKey="requests" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="errors" stroke="hsl(var(--destructive))" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
