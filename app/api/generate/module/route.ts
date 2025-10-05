// API for generating mission modules with Gemini

import { type NextRequest, NextResponse } from "next/server"
import { missions } from "@/lib/data/missions"
import { papers } from "@/lib/data/papers"
import { generateNarrative, generateLessons, generateQuestions } from "@/lib/gemini"
import type { DifficultyLevel, Language } from "@/types"

// Simple cache for generated modules
const moduleCache = new Map<string, any>()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { missionId, level, language } = body as {
      missionId: string
      level: DifficultyLevel
      language: Language
    }

    // Check cache first
    const cacheKey = `${missionId}-${level}-${language}`
    if (moduleCache.has(cacheKey)) {
      return NextResponse.json({
        module: moduleCache.get(cacheKey),
        cached: true,
      })
    }

    const mission = missions.find((m) => m.id === missionId)
    const paper = papers.find((p) => p.id === mission?.paperId)

    if (!mission || !paper) {
      return NextResponse.json({ error: "Mission or paper not found" }, { status: 404 })
    }

    // Generate content with Gemini
    const [narrative, lessons, questions] = await Promise.all([
      generateNarrative(mission, paper, level, language),
      generateLessons(mission, paper, level, language),
      generateQuestions(mission, level, language),
    ])

    const module = {
      id: `module-${Date.now()}`,
      missionId,
      level,
      language,
      narrative,
      lessons,
      questions,
      generatedAt: new Date(),
    }

    // Cache the result
    moduleCache.set(cacheKey, module)

    return NextResponse.json({ module, cached: false })
  } catch (error: any) {
    console.error("Generation error:", error)
    return NextResponse.json(
      {
        error: "Failed to generate module",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
