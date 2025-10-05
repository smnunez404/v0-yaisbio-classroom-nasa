"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { allPapers, papersByCategory, searchPapers } from "@/lib/data/papers"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, ExternalLink, BookOpen } from "lucide-react"

export default function PapersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [language, setLanguage] = useState<"en" | "es">("en")

  const filteredPapers = searchQuery
    ? searchPapers(searchQuery)
    : papersByCategory[selectedCategory as keyof typeof papersByCategory] || allPapers

  const categories = [
    { id: "all", label: "All Papers", labelEs: "Todos los Artículos" },
    {
      id: "space-biology",
      label: "Space Biology",
      labelEs: "Biología Espacial",
    },
    {
      id: "musculoskeletal",
      label: "Musculoskeletal",
      labelEs: "Musculoesquelético",
    },
    { id: "plant-biology", label: "Plant Biology", labelEs: "Biología Vegetal" },
    { id: "immunology", label: "Immunology", labelEs: "Inmunología" },
    { id: "microbiology", label: "Microbiology", labelEs: "Microbiología" },
    {
      id: "radiation-biology",
      label: "Radiation Biology",
      labelEs: "Biología de Radiación",
    },
    { id: "genomics", label: "Genomics", labelEs: "Genómica" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950">
      <Navigation language={language} onLanguageChange={setLanguage} />

      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            {language === "en" ? "Research Papers" : "Artículos de Investigación"}
          </h1>
          <p className="text-slate-300 text-lg">
            {language === "en"
              ? `Explore ${allPapers.length} NASA GeneLab research papers on space biology`
              : `Explora ${allPapers.length} artículos de investigación del GeneLab de la NASA sobre biología espacial`}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              type="text"
              placeholder={language === "en" ? "Search papers..." : "Buscar artículos..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-900/50 border-purple-500/30 text-white"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
                className={
                  selectedCategory === cat.id
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "border-purple-500/30 text-slate-300 hover:bg-purple-900/30"
                }
              >
                {language === "en" ? cat.label : cat.labelEs}
              </Button>
            ))}
          </div>
        </div>

        {/* Papers Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPapers.map((paper) => (
            <Card
              key={paper.id}
              className="bg-slate-900/50 border-purple-500/30 p-4 hover:border-purple-500/60 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30">{paper.category}</Badge>
                {paper.pmcId && <span className="text-xs text-slate-400">PMC{paper.pmcId}</span>}
              </div>

              <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{paper.title}</h3>

              <p className="text-sm text-slate-400 mb-3">
                {paper.authors} • {paper.year}
              </p>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-purple-500/30 text-purple-300 hover:bg-purple-900/30 bg-transparent"
                  asChild
                >
                  <a href={paper.pmcLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    {language === "en" ? "Read Paper" : "Leer Artículo"}
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredPapers.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">
              {language === "en"
                ? "No papers found matching your search"
                : "No se encontraron artículos que coincidan con tu búsqueda"}
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
