"use client"

import { Button } from "@/components/ui/button"
import { Calendar, Download, Settings } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function DashboardHeader() {
  const { language } = useLanguage()
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground text-balance">
              {language === "es" ? "Análisis de Investigación Espacial" : "Space Research Analysis"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {language === "es" ? "Monitoreo en tiempo real e insights de misiones de la NASA" : "Real-time monitoring and insights from NASA missions"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              {language === "es" ? "Últimas 12 horas" : "Last 12 hours"}
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              {language === "es" ? "Exportar" : "Export"}
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
