import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for MVP
const proposals: any[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userCode, missionId, title, description, language } = body

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 })
    }

    const proposal = {
      id: Math.random().toString(36).substring(7),
      userCode,
      missionId,
      title,
      description,
      language,
      createdAt: new Date().toISOString(),
    }

    proposals.push(proposal)

    return NextResponse.json({
      success: true,
      proposal,
    })
  } catch (error) {
    console.error("Error saving proposal:", error)
    return NextResponse.json({ error: "Failed to save proposal" }, { status: 500 })
  }
}
