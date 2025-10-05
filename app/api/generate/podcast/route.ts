import { type NextRequest, NextResponse } from "next/server"
import { missions } from "@/lib/data/missions"
import { papers } from "@/lib/data/papers"
import { generateMissionPodcast, convertToWav } from "@/lib/gemini-audio"
import type { DifficultyLevel, Language } from "@/types"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const audioCache = new Map<string, Buffer>()

const SUPPORTED_LANGUAGES = ["es", "en"] as const

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Podcast API called")

    let missionId: string, level: string, language: string
    try {
      const body = await request.json()
      missionId = body.missionId
      level = body.level
      language = body.language
      console.log("[v0] Request params:", { missionId, level, language })
    } catch (parseError) {
      console.error("[v0] Failed to parse request body:", parseError)
      return NextResponse.json({ error: "invalid_request", message: "Invalid request body" }, { status: 400 })
    }

    if (!SUPPORTED_LANGUAGES.includes(language as any)) {
      return NextResponse.json(
        {
          error: "unsupported_language",
          message: `Language '${language}' is not supported. Supported languages: ${SUPPORTED_LANGUAGES.join(", ")}`,
        },
        { status: 400 },
      )
    }

    const mission = missions.find((m) => m.id === missionId)
    if (!mission) {
      console.error("[v0] Mission not found:", missionId)
      return NextResponse.json({ error: "Mission not found" }, { status: 404 })
    }

    const paper = papers.find((p) => p.id === mission.paperId)
    if (!paper) {
      console.error("[v0] Paper not found:", mission.paperId)
      return NextResponse.json({ error: "Paper not found" }, { status: 404 })
    }

    const cacheKey = `${missionId}-${level}-${language}`
    const cachedAudio = audioCache.get(cacheKey)

    if (cachedAudio) {
      console.log("[v0] Serving cached podcast from memory:", cacheKey)
      return new NextResponse(cachedAudio, {
        headers: {
          "Content-Type": "audio/wav",
          "Content-Length": cachedAudio.length.toString(),
          "X-Cache": "HIT",
        },
      })
    }

    console.log("[v0] Generating new podcast with Gemini 2.5 Flash TTS...")

    let audioChunks
    try {
      audioChunks = await generateMissionPodcast(mission, paper, level as DifficultyLevel, language as Language)
      console.log("[v0] Generated", audioChunks.length, "audio chunks")
    } catch (genError) {
      console.error("[v0] Audio generation failed:", genError)
      const errorMessage = genError instanceof Error ? genError.message : String(genError)

      if (
        errorMessage.includes("429") ||
        errorMessage.includes("quota") ||
        errorMessage.includes("RESOURCE_EXHAUSTED")
      ) {
        return NextResponse.json(
          {
            error: "quota_exceeded",
            message: "API quota exceeded. Please try again later.",
            retryAfter: 60,
          },
          { status: 429 },
        )
      }

      if (errorMessage.includes("token limit") || errorMessage.includes("MAX_CONTEXT_TOKENS")) {
        return NextResponse.json(
          {
            error: "content_too_long",
            message: "The content exceeds the 32,000 token limit for TTS generation.",
          },
          { status: 400 },
        )
      }

      return NextResponse.json(
        {
          error: "generation_failed",
          message: "Failed to generate podcast audio",
          details: errorMessage,
        },
        { status: 500 },
      )
    }

    if (!audioChunks || audioChunks.length === 0) {
      console.error("[v0] No audio chunks generated")
      return NextResponse.json(
        { error: "No audio generated", message: "The AI did not produce any audio" },
        { status: 500 },
      )
    }

    let combinedAudio: Buffer
    try {
      const audioBuffers = audioChunks.map((chunk) => {
        if (chunk.mimeType.includes("wav")) {
          return chunk.data
        }
        return convertToWav(chunk.data, chunk.mimeType)
      })
      combinedAudio = Buffer.concat(audioBuffers)
      console.log("[v0] Combined audio size:", combinedAudio.length, "bytes")
    } catch (combineError) {
      console.error("[v0] Failed to combine audio:", combineError)
      return NextResponse.json(
        {
          error: "processing_failed",
          message: "Failed to process audio chunks",
          details: combineError instanceof Error ? combineError.message : String(combineError),
        },
        { status: 500 },
      )
    }

    audioCache.set(cacheKey, combinedAudio)
    console.log("[v0] Cached podcast in memory:", cacheKey)

    return new NextResponse(combinedAudio, {
      headers: {
        "Content-Type": "audio/wav",
        "Content-Length": combinedAudio.length.toString(),
        "X-Cache": "MISS",
      },
    })
  } catch (error) {
    console.error("[v0] Unexpected error in podcast API:", error)

    return NextResponse.json(
      {
        error: "internal_error",
        message: "An unexpected error occurred",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
