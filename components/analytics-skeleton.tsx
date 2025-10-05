import { Card } from "@/components/ui/card"

export function AnalyticsSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="h-12 bg-secondary rounded animate-pulse" />
        </div>
      </header>
      <main className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="p-4 bg-card border-border">
              <div className="h-20 bg-secondary rounded animate-pulse" />
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[...Array(2)].map((_, i) => (
            <Card key={i} className="p-6 bg-card border-border">
              <div className="h-[240px] bg-secondary rounded animate-pulse" />
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
