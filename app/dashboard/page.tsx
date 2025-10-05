"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { missions } from "@/lib/data/missions"
import { badges } from "@/lib/data/badges"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  const [language, setLanguage] = useState<"es" | "en">("es")
  const [userProgress, setUserProgress] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load user progress from localStorage or API
    const savedProgress = localStorage.getItem("yaisbio_progress")
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress))
    } else {
      // Initialize new user progress
      const newProgress = {
        code: Math.random().toString(36).substring(7).toUpperCase(),
        completedMissions: [],
        badges: [],
        totalQuestions: 0,
        correctAnswers: 0,
        language: "es",
        createdAt: new Date().toISOString(),
      }
      setUserProgress(newProgress)
      localStorage.setItem("yaisbio_progress", JSON.stringify(newProgress))
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
        <Navigation language={language} onLanguageChange={setLanguage} />
        <div className="container mx-auto px-4 py-16 text-center text-white">
          <div className="text-2xl">{language === "es" ? "Cargando..." : "Loading..."}</div>
        </div>
      </div>
    )
  }

  const completionPercentage = (userProgress.completedMissions.length / missions.length) * 100
  const earnedBadges = badges.filter((badge) => userProgress.badges.includes(badge.id))
  const accuracy =
    userProgress.totalQuestions > 0 ? Math.round((userProgress.correctAnswers / userProgress.totalQuestions) * 100) : 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      <Navigation language={language} onLanguageChange={setLanguage} />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {language === "es" ? "Mi Progreso" : "My Progress"}
          </h1>
          <p className="text-xl text-purple-200">
            {language === "es" ? "Código de Astronauta:" : "Astronaut Code:"}{" "}
            <span className="font-mono font-bold text-green-400">{userProgress.code}</span>
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">
                {language === "es" ? "Misiones Completadas" : "Missions Completed"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-400">
                {userProgress.completedMissions.length}/{missions.length}
              </div>
              <Progress value={completionPercentage} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">
                {language === "es" ? "Badges Ganadas" : "Badges Earned"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-yellow-400">
                {earnedBadges.length}/{badges.length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">{language === "es" ? "Precisión" : "Accuracy"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-400">{accuracy}%</div>
              <p className="text-sm text-purple-200 mt-1">
                {userProgress.correctAnswers}/{userProgress.totalQuestions}{" "}
                {language === "es" ? "correctas" : "correct"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">{language === "es" ? "Tiempo Total" : "Total Time"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-purple-400">
                {userProgress.completedMissions.reduce((acc: number, missionId: string) => {
                  const mission = missions.find((m) => m.id === missionId)
                  return acc + (mission?.duration || 0)
                }, 0)}
              </div>
              <p className="text-sm text-purple-200 mt-1">{language === "es" ? "minutos" : "minutes"}</p>
            </CardContent>
          </Card>
        </div>

        {/* Badges Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">{language === "es" ? "🏆 Mis Badges" : "🏆 My Badges"}</h2>
          {earnedBadges.length > 0 ? (
            <div className="grid md:grid-cols-4 gap-4">
              {earnedBadges.map((badge) => (
                <Card key={badge.id} className="bg-white/10 backdrop-blur-lg border-yellow-500/30">
                  <CardContent className="p-6 text-center">
                    <div className="text-5xl mb-3">🏅</div>
                    <h3 className="text-white font-bold mb-1">{language === "es" ? badge.nameEs : badge.name}</h3>
                    <p className="text-sm text-purple-200">
                      {language === "es" ? badge.descriptionEs : badge.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20">
              <CardContent className="p-8 text-center">
                <p className="text-purple-200 text-lg">
                  {language === "es" ? "¡Completa misiones para ganar badges!" : "Complete missions to earn badges!"}
                </p>
                <Link href="/missions" className="text-green-400 hover:text-green-300 font-semibold mt-2 inline-block">
                  {language === "es" ? "Explorar Misiones →" : "Explore Missions →"}
                </Link>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Mission Progress */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">
            {language === "es" ? "📊 Progreso por Misión" : "📊 Mission Progress"}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {missions.map((mission) => {
              const isCompleted = userProgress.completedMissions.includes(mission.id)
              return (
                <Card
                  key={mission.id}
                  className={`backdrop-blur-lg border-purple-500/20 ${
                    isCompleted ? "bg-green-500/20 border-green-500/30" : "bg-white/10"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            className={
                              mission.level === "beginner"
                                ? "bg-green-500"
                                : mission.level === "intermediate"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }
                          >
                            {language === "es"
                              ? mission.level === "beginner"
                                ? "Principiante"
                                : mission.level === "intermediate"
                                  ? "Intermedio"
                                  : "Avanzado"
                              : mission.level}
                          </Badge>
                          {isCompleted && <span className="text-green-400 text-xl">✓</span>}
                        </div>
                        <h3 className="text-white font-bold mb-1">
                          {language === "es" ? mission.titleEs : mission.title}
                        </h3>
                        <p className="text-sm text-purple-200">{mission.duration} min</p>
                      </div>
                      <Link
                        href={`/missions/${mission.id}`}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        {isCompleted
                          ? language === "es"
                            ? "Revisar"
                            : "Review"
                          : language === "es"
                            ? "Comenzar"
                            : "Start"}
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
