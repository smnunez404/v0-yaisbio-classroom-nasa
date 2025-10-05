"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"

// Sample glossary terms (50 terms as per spec)
const glossaryTerms = [
  {
    id: "1",
    term: "Microgravity",
    termEs: "Microgravedad",
    definition: "A condition in which objects appear to be weightless, experienced in orbit around Earth.",
    definitionEs:
      "Condición en la que los objetos parecen no tener peso, experimentada en órbita alrededor de la Tierra.",
    category: "Physics",
    categoryEs: "Física",
  },
  {
    id: "2",
    term: "Osteoblast",
    termEs: "Osteoblasto",
    definition: "Cells responsible for bone formation and mineralization.",
    definitionEs: "Células responsables de la formación y mineralización ósea.",
    category: "Biology",
    categoryEs: "Biología",
  },
  {
    id: "3",
    term: "Oxidative Stress",
    termEs: "Estrés Oxidativo",
    definition: "Imbalance between free radicals and antioxidants in the body, causing cellular damage.",
    definitionEs: "Desequilibrio entre radicales libres y antioxidantes en el cuerpo, causando daño celular.",
    category: "Biochemistry",
    categoryEs: "Bioquímica",
  },
  {
    id: "4",
    term: "RNA Sequencing",
    termEs: "Secuenciación de ARN",
    definition: "Technique to analyze gene expression by sequencing RNA molecules.",
    definitionEs: "Técnica para analizar la expresión génica mediante secuenciación de moléculas de ARN.",
    category: "Genetics",
    categoryEs: "Genética",
  },
  {
    id: "5",
    term: "Stem Cell",
    termEs: "Célula Madre",
    definition: "Undifferentiated cells capable of developing into specialized cell types.",
    definitionEs: "Células no diferenciadas capaces de desarrollarse en tipos celulares especializados.",
    category: "Biology",
    categoryEs: "Biología",
  },
]

export default function GlossaryPage() {
  const { language, isLoaded } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTerms = glossaryTerms.filter((term) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      term.term.toLowerCase().includes(searchLower) ||
      term.termEs.toLowerCase().includes(searchLower) ||
      term.definition.toLowerCase().includes(searchLower) ||
      term.definitionEs.toLowerCase().includes(searchLower)
    )
  })

  // Mostrar loading hasta que el contexto esté cargado
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-2xl">Cargando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {language === "es" ? "📚 Glosario Científico" : "📚 Scientific Glossary"}
            </h1>
            <p className="text-xl text-purple-200 mb-6">
              {language === "es"
                ? "Términos clave de biología espacial y ciencia"
                : "Key terms from space biology and science"}
            </p>

            {/* Search */}
            <Input
              type="text"
              placeholder={language === "es" ? "Buscar término..." : "Search term..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/10 border-purple-500/30 text-white placeholder:text-purple-300"
            />
          </div>

          {/* Terms List */}
          <div className="space-y-4">
            {filteredTerms.map((term) => (
              <Card key={term.id} className="bg-white/10 backdrop-blur-lg border-purple-500/20">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-white text-2xl">{language === "es" ? term.termEs : term.term}</CardTitle>
                    <Badge className="bg-purple-600">{language === "es" ? term.categoryEs : term.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-200 leading-relaxed">
                    {language === "es" ? term.definitionEs : term.definition}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTerms.length === 0 && (
            <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20">
              <CardContent className="p-8 text-center">
                <p className="text-purple-200 text-lg">
                  {language === "es" ? "No se encontraron términos" : "No terms found"}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
