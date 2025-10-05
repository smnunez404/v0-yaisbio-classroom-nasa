"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { time: "00:00", upload: 120, download: 80 },
  { time: "02:00", upload: 145, download: 95 },
  { time: "04:00", upload: 135, download: 88 },
  { time: "06:00", upload: 158, download: 102 },
  { time: "08:00", upload: 142, download: 91 },
  { time: "10:00", upload: 151, download: 97 },
  { time: "12:00", upload: 156, download: 89 },
]

const chartConfig = {
  upload: {
    label: "Upload",
    color: "hsl(var(--chart-1))",
  },
  download: {
    label: "Download",
    color: "hsl(var(--chart-2))",
  },
}

export function DataTransferChart() {
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
          dataKey="upload"
          stroke="hsl(var(--chart-1))"
          fill="hsl(var(--chart-1))"
          fillOpacity={0.6}
        />
        <Area
          type="monotone"
          dataKey="download"
          stroke="hsl(var(--chart-2))"
          fill="hsl(var(--chart-2))"
          fillOpacity={0.6}
        />
      </AreaChart>
    </ChartContainer>
  )
}
