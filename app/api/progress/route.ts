// API for user progress management

import { type NextRequest, NextResponse } from "next/server"
import { progressStore } from "@/lib/data/progress-store"
import type { UserProgress } from "@/types"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { language = "es" } = body

    const progress = progressStore.create()
    progress.language = language
    progressStore.update(progress.code, progress)

    return NextResponse.json({ code: progress.code, progress })
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

    progressStore.update(code, updatedProgress)

    return NextResponse.json({ progress: updatedProgress })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update progress" }, { status: 500 })
  }
}
