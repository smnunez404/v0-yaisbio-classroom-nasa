"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/contexts/language-context"

export default function ProposePage() {
  const { language, isLoaded } = useLanguage()
  const [formData, setFormData] = useState({
    title: "",
    hypothesis: "",
    methodology: "",
    expectedResults: "",
    name: "",
    email: "",
  })
  const [submitted, setSubmitted] = useState(false)

  // Mostrar loading hasta que el contexto esté cargado
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-2xl">Cargando...</div>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would send to an API
    console.log("Experiment proposal:", formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        title: "",
        hypothesis: "",
        methodology: "",
        expectedResults: "",
        name: "",
        email: "",
      })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {language === "es" ? "🔬 Proponer Experimento" : "🔬 Propose Experiment"}
            </h1>
            <p className="text-xl text-purple-200">
              {language === "es"
                ? "Diseña tu propio experimento de biología espacial"
                : "Design your own space biology experiment"}
            </p>
          </div>

          {submitted ? (
            <Card className="bg-green-500/20 backdrop-blur-lg border-green-500/30">
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {language === "es" ? "¡Propuesta Enviada!" : "Proposal Submitted!"}
                </h2>
                <p className="text-purple-200">
                  {language === "es"
                    ? "Gracias por tu contribución a la ciencia espacial"
                    : "Thank you for your contribution to space science"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white text-2xl">
                  {language === "es" ? "Formulario de Propuesta" : "Proposal Form"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div>
                    <Label htmlFor="title" className="text-white mb-2 block">
                      {language === "es" ? "Título del Experimento" : "Experiment Title"}
                    </Label>
                    <Input
                      id="title"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="bg-white/10 border-purple-500/30 text-white placeholder:text-purple-300"
                      placeholder={
                        language === "es" ? "Ej: Efecto de la microgravedad en..." : "Ex: Effect of microgravity on..."
                      }
                    />
                  </div>

                  {/* Hypothesis */}
                  <div>
                    <Label htmlFor="hypothesis" className="text-white mb-2 block">
                      {language === "es" ? "Hipótesis" : "Hypothesis"}
                    </Label>
                    <Textarea
                      id="hypothesis"
                      required
                      value={formData.hypothesis}
                      onChange={(e) => setFormData({ ...formData, hypothesis: e.target.value })}
                      className="bg-white/10 border-purple-500/30 text-white placeholder:text-purple-300 min-h-24"
                      placeholder={language === "es" ? "¿Qué esperas descubrir?" : "What do you expect to discover?"}
                    />
                  </div>

                  {/* Methodology */}
                  <div>
                    <Label htmlFor="methodology" className="text-white mb-2 block">
                      {language === "es" ? "Metodología" : "Methodology"}
                    </Label>
                    <Textarea
                      id="methodology"
                      required
                      value={formData.methodology}
                      onChange={(e) => setFormData({ ...formData, methodology: e.target.value })}
                      className="bg-white/10 border-purple-500/30 text-white placeholder:text-purple-300 min-h-32"
                      placeholder={
                        language === "es"
                          ? "¿Cómo realizarías el experimento?"
                          : "How would you conduct the experiment?"
                      }
                    />
                  </div>

                  {/* Expected Results */}
                  <div>
                    <Label htmlFor="expectedResults" className="text-white mb-2 block">
                      {language === "es" ? "Resultados Esperados" : "Expected Results"}
                    </Label>
                    <Textarea
                      id="expectedResults"
                      required
                      value={formData.expectedResults}
                      onChange={(e) => setFormData({ ...formData, expectedResults: e.target.value })}
                      className="bg-white/10 border-purple-500/30 text-white placeholder:text-purple-300 min-h-24"
                      placeholder={language === "es" ? "¿Qué resultados anticipas?" : "What results do you anticipate?"}
                    />
                  </div>

                  {/* Name */}
                  <div>
                    <Label htmlFor="name" className="text-white mb-2 block">
                      {language === "es" ? "Tu Nombre" : "Your Name"}
                    </Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-white/10 border-purple-500/30 text-white placeholder:text-purple-300"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="text-white mb-2 block">
                      {language === "es" ? "Tu Email" : "Your Email"}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-white/10 border-purple-500/30 text-white placeholder:text-purple-300"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white text-lg py-6">
                    {language === "es" ? "🚀 Enviar Propuesta" : "🚀 Submit Proposal"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Tips */}
          <Card className="bg-blue-500/20 backdrop-blur-lg border-blue-500/30 mt-6">
            <CardHeader>
              <CardTitle className="text-white">
                💡 {language === "es" ? "Consejos para tu Propuesta" : "Tips for Your Proposal"}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-purple-200 space-y-2">
              <p>
                {language === "es"
                  ? "• Sé específico sobre qué quieres investigar"
                  : "• Be specific about what you want to investigate"}
              </p>
              <p>
                {language === "es" ? "• Considera las limitaciones del espacio" : "• Consider the limitations of space"}
              </p>
              <p>{language === "es" ? "• Piensa en aplicaciones prácticas" : "• Think about practical applications"}</p>
              <p>
                {language === "es"
                  ? "• Revisa papers similares para inspiración"
                  : "• Review similar papers for inspiration"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
