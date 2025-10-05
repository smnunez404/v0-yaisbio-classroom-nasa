// API for individual mission

import { type NextRequest, NextResponse } from "next/server"
import { missions } from "@/lib/data/missions"
import { papers } from "@/lib/data/papers"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const mission = missions.find((m) => m.id === params.id)

  if (!mission) {
    return NextResponse.json({ error: "Mission not found" }, { status: 404 })
  }

  const paper = papers.find((p) => p.id === mission.paperId)

  return NextResponse.json({ mission, paper })
}
