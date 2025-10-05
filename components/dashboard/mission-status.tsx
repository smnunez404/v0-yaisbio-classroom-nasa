import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertCircle, Clock } from "lucide-react"

const missions = [
  {
    name: "ISS Microgravity Study",
    status: "active",
    progress: 87,
    dataPoints: "145K",
  },
  {
    name: "Mars Soil Analysis",
    status: "active",
    progress: 62,
    dataPoints: "89K",
  },
  {
    name: "Lunar Plant Growth",
    status: "pending",
    progress: 15,
    dataPoints: "12K",
  },
  {
    name: "Radiation Effects Study",
    status: "warning",
    progress: 94,
    dataPoints: "203K",
  },
]

export function MissionStatus() {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground mb-1">Mission Status</h2>
        <p className="text-sm text-muted-foreground">Current research operations</p>
      </div>

      <div className="space-y-4">
        {missions.map((mission) => (
          <div key={mission.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {mission.status === "active" && <CheckCircle2 className="w-4 h-4 text-accent" />}
                {mission.status === "warning" && <AlertCircle className="w-4 h-4 text-destructive" />}
                {mission.status === "pending" && <Clock className="w-4 h-4 text-muted-foreground" />}
                <span className="text-sm font-medium text-foreground">{mission.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">{mission.dataPoints}</span>
                <Badge variant={mission.status === "active" ? "default" : "secondary"} className="text-xs">
                  {mission.progress}%
                </Badge>
              </div>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  mission.status === "active"
                    ? "bg-primary"
                    : mission.status === "warning"
                      ? "bg-destructive"
                      : "bg-muted-foreground"
                }`}
                style={{ width: `${mission.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
