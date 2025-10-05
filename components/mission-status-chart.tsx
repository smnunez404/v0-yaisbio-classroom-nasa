"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { category: "Biology", success: 98, failed: 2 },
  { category: "Physics", success: 96, failed: 4 },
  { category: "Chemistry", success: 99, failed: 1 },
  { category: "Astronomy", success: 97, failed: 3 },
  { category: "Geology", success: 95, failed: 5 },
]

const chartConfig = {
  success: {
    label: "Success",
    color: "hsl(var(--chart-3))",
  },
  failed: {
    label: "Failed",
    color: "hsl(var(--destructive))",
  },
}

export function MissionStatusChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[240px] w-full">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
        <XAxis
          dataKey="category"
          tickLine={false}
          axisLine={false}
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
        />
        <YAxis tickLine={false} axisLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="success" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
        <Bar dataKey="failed" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}
