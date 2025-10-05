// Missions listing page

"use client"

import { useState } from "react"
import Link from "next/link"
import { missions } from "@/lib/data/missions"
import type { DifficultyLevel } from "@/types"
import { Navigation } from "@/components/navigation"
import { useLanguage } from "@/contexts/language-context"

export default function MissionsPage() {
  const [filter, setFilter] = useState<DifficultyLevel | "all">("all")
  const { language, isLoaded } = useLanguage()

  const filteredMissions = filter === "all" ? missions : missions.filter((m) => m.level === filter)

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
      {/* Navigation component */}
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="text-white hover:text-purple-300">
            ← Back to Home
          </Link>
        </div>

        <h1 className="text-5xl font-bold text-white mb-4">
          {language === "es" ? "Misiones Disponibles" : "Available Missions"}
        </h1>
        <p className="text-xl text-purple-200 mb-8">
          {language === "es"
            ? "Explora investigaciones de biología espacial de la NASA"
            : "Explore NASA space biology research"}
        </p>

        {/* Filters */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              filter === "all" ? "bg-green-500 text-white" : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {language === "es" ? "Todas" : "All"}
          </button>
          <button
            onClick={() => setFilter("beginner")}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              filter === "beginner" ? "bg-green-500 text-white" : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {language === "es" ? "Principiante" : "Beginner"}
          </button>
          <button
            onClick={() => setFilter("intermediate")}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              filter === "intermediate" ? "bg-yellow-500 text-white" : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {language === "es" ? "Intermedio" : "Intermediate"}
          </button>
          <button
            onClick={() => setFilter("advanced")}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              filter === "advanced" ? "bg-red-500 text-white" : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {language === "es" ? "Avanzado" : "Advanced"}
          </button>
        </div>

        {/* Missions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMissions.map((mission) => (
            <Link
              key={mission.id}
              href={`/missions/${mission.id}`}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white hover:bg-white/20 transition-all transform hover:scale-105"
            >
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
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
                <span className="text-purple-200 text-sm">
                  {mission.duration} {language === "es" ? "min" : "min"}
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-3">{language === "es" ? mission.titleEs : mission.title}</h3>

              <p className="text-purple-200 mb-4">{language === "es" ? mission.descriptionEs : mission.description}</p>

              <div className="flex flex-wrap gap-2">
                {(language === "es" ? mission.conceptsEs : mission.concepts).slice(0, 3).map((concept, i) => (
                  <span key={i} className="bg-purple-600/50 px-2 py-1 rounded text-xs">
                    {concept}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
