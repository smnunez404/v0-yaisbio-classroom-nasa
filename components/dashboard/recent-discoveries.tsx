import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, ExternalLink } from "lucide-react"

const discoveries = [
  {
    title: "Novel Protein Crystallization in Microgravity",
    category: "Structural Biology",
    date: "2 hours ago",
    impact: "High",
  },
  {
    title: "Enhanced Plant Growth Under LED Spectrum Variation",
    category: "Astrobotany",
    date: "5 hours ago",
    impact: "Medium",
  },
  {
    title: "Radiation Shielding Properties of Lunar Regolith",
    category: "Materials Science",
    date: "8 hours ago",
    impact: "High",
  },
  {
    title: "Bacterial Adaptation to Space Environment",
    category: "Microbiology",
    date: "11 hours ago",
    impact: "Medium",
  },
]

export function RecentDiscoveries() {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground mb-1">Recent Discoveries</h2>
        <p className="text-sm text-muted-foreground">Latest findings from ongoing research</p>
      </div>

      <div className="space-y-4">
        {discoveries.map((discovery, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer group"
          >
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <FileText className="w-5 h-5 text-primary" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-sm font-semibold text-foreground text-balance leading-relaxed">
                  {discovery.title}
                </h3>
                <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <Badge variant="outline" className="text-xs">
                  {discovery.category}
                </Badge>
                <span className="text-xs text-muted-foreground">{discovery.date}</span>
                <Badge variant={discovery.impact === "High" ? "default" : "secondary"} className="text-xs">
                  {discovery.impact} Impact
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
