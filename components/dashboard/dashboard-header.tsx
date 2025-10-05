import { Button } from "@/components/ui/button"
import { Calendar, Download, Settings } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground text-balance">Space Research Analysis</h1>
            <p className="text-muted-foreground mt-1">Real-time monitoring and insights from NASA missions</p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Last 12 hours
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
