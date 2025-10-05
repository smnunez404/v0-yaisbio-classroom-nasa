"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Calendar, Download, Settings } from "lucide-react"
import Link from "next/link"
import { MetricCard } from "@/components/metric-card"
import { ResearchChart } from "@/components/research-chart"
import { DataTransferChart } from "@/components/data-transfer-chart"
import { MissionStatusChart } from "@/components/mission-status-chart"
import { ResearchTable } from "@/components/research-table"

export function AnalyticsDashboard() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Space Research Analytics</h1>
                <p className="text-sm text-muted-foreground">Real-time mission and research data</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Calendar className="h-4 w-4" />
                Last 12 hours
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-6">
        {/* Top Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard title="Active Missions" value="24" change="+12%" trend="up" subtitle="vs last period" />
          <MetricCard title="Data Processed" value="2.4 TB" change="+8.3%" trend="up" subtitle="in last 12 hours" />
          <MetricCard title="Research Papers" value="608" change="+15" trend="up" subtitle="total analyzed" />
          <MetricCard title="Success Rate" value="98.7%" change="+0.2%" trend="up" subtitle="mission completion" />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-medium text-foreground">Mission Activity</h3>
                <p className="text-xs text-muted-foreground mt-1">Requests over time</p>
              </div>
              <div className="flex gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-chart-1" />
                  <span className="text-muted-foreground">Active</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-chart-2" />
                  <span className="text-muted-foreground">Completed</span>
                </div>
              </div>
            </div>
            <ResearchChart />
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-medium text-foreground">Data Transfer</h3>
                <p className="text-xs text-muted-foreground mt-1">Bandwidth usage</p>
              </div>
              <div className="flex gap-2 text-xs">
                <span className="text-chart-1 font-mono">↑ 156 GB</span>
                <span className="text-chart-2 font-mono">↓ 89 GB</span>
              </div>
            </div>
            <DataTransferChart />
          </Card>
        </div>

        {/* Mission Status and Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <Card className="p-6 bg-card border-border lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-medium text-foreground">Mission Performance</h3>
                <p className="text-xs text-muted-foreground mt-1">Success rate by category</p>
              </div>
            </div>
            <MissionStatusChart />
          </Card>

          <Card className="p-6 bg-card border-border">
            <h3 className="text-sm font-medium text-foreground mb-4">System Health</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">CPU Usage</span>
                  <span className="text-xs font-mono text-foreground">42%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-chart-1" style={{ width: "42%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Memory</span>
                  <span className="text-xs font-mono text-foreground">68%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-chart-2" style={{ width: "68%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Storage</span>
                  <span className="text-xs font-mono text-foreground">81%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-chart-3" style={{ width: "81%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Network</span>
                  <span className="text-xs font-mono text-foreground">35%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-chart-4" style={{ width: "35%" }} />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Research Data Table */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-medium text-foreground">Recent Research Data</h3>
              <p className="text-xs text-muted-foreground mt-1">Latest mission results</p>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          <ResearchTable />
        </Card>
      </main>
    </div>
  )
}
