"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { time: "00:00", active: 2400, completed: 1800 },
  { time: "02:00", active: 2210, completed: 1950 },
  { time: "04:00", active: 2100, completed: 2100 },
  { time: "06:00", active: 2350, completed: 2200 },
  { time: "08:00", active: 2600, completed: 2400 },
  { time: "10:00", active: 2450, completed: 2350 },
  { time: "12:00", active: 2550, completed: 2450 },
]

const chartConfig = {
  active: {
    label: "Active",
    color: "hsl(var(--chart-1))",
  },
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-2))",
  },
}

export function ResearchChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
        <XAxis
          dataKey="time"
          tickLine={false}
          axisLine={false}
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
        />
        <YAxis tickLine={false} axisLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          type="monotone"
          dataKey="completed"
          stackId="1"
          stroke="hsl(var(--chart-2))"
          fill="hsl(var(--chart-2))"
          fillOpacity={0.6}
        />
        <Area
          type="monotone"
          dataKey="active"
          stackId="1"
          stroke="hsl(var(--chart-1))"
          fill="hsl(var(--chart-1))"
          fillOpacity={0.6}
        />
      </AreaChart>
    </ChartContainer>
  )
}
