import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MetricsGrid } from "@/components/dashboard/metrics-grid"
import { ResearchActivity } from "@/components/dashboard/research-activity"
import { MissionStatus } from "@/components/dashboard/mission-status"
import { DataAnalysis } from "@/components/dashboard/data-analysis"
import { RecentDiscoveries } from "@/components/dashboard/recent-discoveries"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Top Metrics */}
          <MetricsGrid />

          {/* Main Charts Row */}
          <div className="grid lg:grid-cols-2 gap-6">
            <ResearchActivity />
            <DataAnalysis />
          </div>

          {/* Bottom Row */}
          <div className="grid lg:grid-cols-2 gap-6">
            <MissionStatus />
            <RecentDiscoveries />
          </div>
        </div>
      </main>
    </div>
  )
}
