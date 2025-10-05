import { type NextRequest, NextResponse } from "next/server"
import { progressStore } from "@/lib/data/progress-store"

export async function GET(request: NextRequest, { params }: { params: { code: string } }) {
  try {
    const progress = progressStore.get(params.code)

    if (!progress) {
      return NextResponse.json({ badges: [] })
    }

    return NextResponse.json({ badges: progress.badges })
  } catch (error) {
    console.error("Error fetching badges:", error)
    return NextResponse.json({ error: "Failed to fetch badges" }, { status: 500 })
  }
}
