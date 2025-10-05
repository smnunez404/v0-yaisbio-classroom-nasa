// API for missions

import { type NextRequest, NextResponse } from "next/server"
import { missions } from "@/lib/data/missions"

export async function GET(request: NextRequest) {
  const level = request.nextUrl.searchParams.get("level")
  const language = request.nextUrl.searchParams.get("language") || "es"

  let filteredMissions = missions

  if (level) {
    filteredMissions = missions.filter((m) => m.level === level)
  }

  return NextResponse.json({ missions: filteredMissions, language })
}
