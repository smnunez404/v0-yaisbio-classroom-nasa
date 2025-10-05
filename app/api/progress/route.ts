// API for user progress management

import { type NextRequest, NextResponse } from "next/server"
import type { UserProgress } from "@/types"

// In-memory storage for MVP (replace with database in production)
const progressStore = new Map<string, UserProgress>()

function generateCode(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase()
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { language = "es" } = body

    const code = generateCode()
    const progress: UserProgress = {
      code,
      completedMissions: [],
      answers: {},
      badges: [],
      language,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    progressStore.set(code, progress)

    return NextResponse.json({ code, progress })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create progress" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code")

  if (!code) {
    return NextResponse.json({ error: "Code required" }, { status: 400 })
  }

  const progress = progressStore.get(code)

  if (!progress) {
    return NextResponse.json({ error: "Progress not found" }, { status: 404 })
  }

  return NextResponse.json({ progress })
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { code, updates } = body

    if (!code) {
      return NextResponse.json({ error: "Code required" }, { status: 400 })
    }

    const progress = progressStore.get(code)

    if (!progress) {
      return NextResponse.json({ error: "Progress not found" }, { status: 404 })
    }

    const updatedProgress = {
      ...progress,
      ...updates,
      updatedAt: new Date(),
    }

    progressStore.set(code, updatedProgress)

    return NextResponse.json({ progress: updatedProgress })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update progress" }, { status: 500 })
  }
}
