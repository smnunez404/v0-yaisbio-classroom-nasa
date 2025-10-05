// Individual mission page with AI-generated content

"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { missions } from "@/lib/data/missions"
import { papers } from "@/lib/data/papers"
import { PodcastPlayer } from "@/components/podcast-player"
import { useLanguage } from "@/contexts/language-context"

export default function MissionPage() {
  const params = useParams()
  const router = useRouter()
  const { language, isLoaded } = useLanguage()
  const [level, setLevel] = useState<"beginner" | "intermediate" | "advanced">("intermediate")
  const [loading, setLoading] = useState(false)
  const [module, setModule] = useState<any>(null)
  const [currentStep, setCurrentStep] = useState<"intro" | "narrative" | "lessons" | "questions">("intro")

  // Mostrar loading hasta que el contexto esté cargado
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-2xl">Cargando...</div>
      </div>
    )
  }

  const mission = missions.find((m) => m.id === params.id)
  const paper = papers.find((p) => p.id === mission?.paperId)

  useEffect(() => {
    if (mission) {
      setLevel(mission.level)
    }
  }, [mission])

  const generateModule = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/generate/module", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          missionId: mission?.id,
          level,
          language,
        }),
      })
      const data = await response.json()
      setModule(data.module)
      setCurrentStep("narrative")
    } catch (error) {
      console.error("Failed to generate module:", error)
      alert("Failed to generate content. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!mission || !paper) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-2xl">Mission not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/missions" className="text-white hover:text-purple-300">
            ← {language === "es" ? "Volver a Misiones" : "Back to Missions"}
          </Link>
        </div>

        {currentStep === "intro" && (
          <div className="max-w-4xl mx-auto">
            {/* Mission Info */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-white mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`px-4 py-2 rounded-full font-semibold ${
                    mission.level === "beginner"
                      ? "bg-green-500"
                      : mission.level === "intermediate"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                >
                  {language === "es"
                    ? mission.level === "beginner"
                      ? "Principiante"
                      : mission.level === "intermediate"
                        ? "Intermedio"
                        : "Avanzado"
                    : mission.level}
                </span>
                <span className="text-purple-200">
                  {mission.duration} {language === "es" ? "minutos" : "minutes"}
                </span>
              </div>

              <h1 className="text-4xl font-bold mb-4">{language === "es" ? mission.titleEs : mission.title}</h1>

              <p className="text-xl text-purple-200 mb-6">
                {language === "es" ? mission.descriptionEs : mission.description}
              </p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">
                  {language === "es" ? "Conceptos Clave:" : "Key Concepts:"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(language === "es" ? mission.conceptsEs : mission.concepts).map((concept, i) => (
                    <span key={i} className="bg-purple-600/50 px-3 py-1 rounded-lg">
                      {concept}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold mb-2">
                  🔬 {language === "es" ? "Brecha de Investigación:" : "Research Gap:"}
                </h3>
                <p className="text-purple-200">{language === "es" ? mission.researchGapEs : mission.researchGap}</p>
              </div>

              <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">
                  📄 {language === "es" ? "Paper Científico:" : "Scientific Paper:"}
                </h3>
                <p className="text-purple-200 mb-2">{language === "es" ? paper.titleEs : paper.title}</p>
                <a
                  href={paper.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300"
                >
                  {language === "es" ? "Ver paper completo →" : "View full paper →"}
                </a>
              </div>
            </div>

            {/* Podcast Player */}
            <div className="mb-8">
              <PodcastPlayer missionId={mission.id} level={level} language={language} />
            </div>

            {/* Level Selection */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-white mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === "es" ? "Selecciona tu Nivel:" : "Select Your Level:"}
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <button
                  onClick={() => setLevel("beginner")}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    level === "beginner" ? "border-green-500 bg-green-500/20" : "border-white/20 hover:border-white/40"
                  }`}
                >
                  <div className="text-3xl mb-2">🌱</div>
                  <div className="font-bold mb-1">{language === "es" ? "Principiante" : "Beginner"}</div>
                  <div className="text-sm text-purple-200">{language === "es" ? "12-15 años" : "Ages 12-15"}</div>
                </button>
                <button
                  onClick={() => setLevel("intermediate")}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    level === "intermediate"
                      ? "border-yellow-500 bg-yellow-500/20"
                      : "border-white/20 hover:border-white/40"
                  }`}
                >
                  <div className="text-3xl mb-2">🚀</div>
                  <div className="font-bold mb-1">{language === "es" ? "Intermedio" : "Intermediate"}</div>
                  <div className="text-sm text-purple-200">{language === "es" ? "16-18 años" : "Ages 16-18"}</div>
                </button>
                <button
                  onClick={() => setLevel("advanced")}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    level === "advanced" ? "border-red-500 bg-red-500/20" : "border-white/20 hover:border-white/40"
                  }`}
                >
                  <div className="text-3xl mb-2">🎓</div>
                  <div className="font-bold mb-1">{language === "es" ? "Avanzado" : "Advanced"}</div>
                  <div className="text-sm text-purple-200">{language === "es" ? "Universitario" : "University"}</div>
                </button>
              </div>
            </div>

            {/* Start Button */}
            <div className="text-center">
              <button
                onClick={generateModule}
                disabled={loading}
                className="bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-white px-12 py-4 rounded-lg text-xl font-bold transition-colors"
              >
                {loading
                  ? language === "es"
                    ? "Generando..."
                    : "Generating..."
                  : language === "es"
                    ? "🚀 Comenzar Misión"
                    : "🚀 Start Mission"}
              </button>
              {loading && (
                <p className="text-purple-200 mt-4">
                  {language === "es"
                    ? "Gemini está creando tu experiencia personalizada..."
                    : "Gemini is creating your personalized experience..."}
                </p>
              )}
            </div>
          </div>
        )}

        {currentStep === "narrative" && module && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-6">{language === "es" ? "📖 Tu Misión" : "📖 Your Mission"}</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-lg leading-relaxed whitespace-pre-wrap">{module.narrative}</p>
              </div>
              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setCurrentStep("intro")}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
                >
                  ← {language === "es" ? "Volver" : "Back"}
                </button>
                <button
                  onClick={() => setCurrentStep("lessons")}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg"
                >
                  {language === "es" ? "Continuar" : "Continue"} →
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === "lessons" && module && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-6">{language === "es" ? "📚 Lecciones" : "📚 Lessons"}</h2>
              <div className="space-y-6">
                {module.lessons.map((lesson: any, index: number) => (
                  <div key={index} className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-3">
                      {index + 1}. {lesson.title}
                    </h3>
                    <p className="text-purple-200 leading-relaxed whitespace-pre-wrap">{lesson.content}</p>
                    {lesson.visualAid && (
                      <div className="mt-4 bg-purple-600/20 border border-purple-500/50 rounded p-3 text-sm">
                        💡 {lesson.visualAid}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setCurrentStep("narrative")}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
                >
                  ← {language === "es" ? "Volver" : "Back"}
                </button>
                <button
                  onClick={() => setCurrentStep("questions")}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg"
                >
                  {language === "es" ? "Evaluación" : "Assessment"} →
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === "questions" && module && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-6">{language === "es" ? "✅ Evaluación" : "✅ Assessment"}</h2>
              <div className="space-y-6">
                {module.questions.map((question: any, index: number) => (
                  <div key={index} className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      {index + 1}. {question.text}
                    </h3>
                    {question.type === "multiple-choice" && question.options && (
                      <div className="space-y-2">
                        {question.options.map((option: string, i: number) => (
                          <button
                            key={i}
                            className="w-full text-left bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/50 rounded-lg p-3 transition-colors"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                    {question.type === "open-ended" && (
                      <textarea
                        className="w-full bg-purple-900/50 border border-purple-500/50 rounded-lg p-3 text-white"
                        rows={4}
                        placeholder={language === "es" ? "Escribe tu respuesta..." : "Write your answer..."}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setCurrentStep("lessons")}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
                >
                  ← {language === "es" ? "Volver" : "Back"}
                </button>
                <button
                  onClick={() => router.push("/missions")}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg"
                >
                  {language === "es" ? "Completar Misión" : "Complete Mission"} ✨
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
