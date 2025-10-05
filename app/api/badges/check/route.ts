import { type NextRequest, NextResponse } from "next/server"
import { progressStore } from "@/lib/data/progress-store"
import { badges } from "@/lib/data/badges"

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 })
    }

    const progress = progressStore.get(code)

    if (!progress) {
      return NextResponse.json({ newBadges: [] })
    }

    const newBadges: string[] = []
    const currentBadges = new Set(progress.badges)

    // Check for new badges based on progress
    badges.forEach((badge) => {
      if (currentBadges.has(badge.id)) return

      let earned = false

      switch (badge.id) {
        case "first-mission":
          earned = progress.completedMissions.length >= 1
          break
        case "polyglot":
          // Check if completed same mission in both languages
          const missionCounts = new Map<string, Set<string>>()
          progress.completedMissions.forEach((m) => {
            if (!missionCounts.has(m.missionId)) {
              missionCounts.set(m.missionId, new Set())
            }
            missionCounts.get(m.missionId)!.add(m.language)
          })
          earned = Array.from(missionCounts.values()).some((langs) => langs.size >= 2)
          break
        case "explorer":
          earned = new Set(progress.completedMissions.map((m) => m.missionId)).size >= 10
          break
        case "perfect-responder":
          earned = progress.completedMissions.filter((m) => m.score >= 100).length >= 3
          break
        case "persistent-learner":
          const missionAttempts = new Map<string, number>()
          progress.completedMissions.forEach((m) => {
            missionAttempts.set(m.missionId, (missionAttempts.get(m.missionId) || 0) + 1)
          })
          earned = Array.from(missionAttempts.values()).some((count) => count >= 2)
          break
        case "questioner":
          earned = progress.totalQuestionsAnswered >= 50
          break
        case "completionist":
          earned = new Set(progress.completedMissions.map((m) => m.missionId)).size >= 10
          break
        case "beginner-stellar":
          earned = progress.completedMissions.filter((m) => m.level === "beginner").length >= 3
          break
        case "intermediate-scientist":
          earned = progress.completedMissions.filter((m) => m.level === "intermediate").length >= 5
          break
        case "advanced-expert":
          earned = progress.completedMissions.filter((m) => m.level === "advanced").length >= 3
          break
      }

      if (earned) {
        newBadges.push(badge.id)
        progress.badges.push(badge.id)
      }
    })

    if (newBadges.length > 0) {
      progressStore.update(code, progress)
    }

    return NextResponse.json({ newBadges })
  } catch (error) {
    console.error("Error checking badges:", error)
    return NextResponse.json({ error: "Failed to check badges" }, { status: 500 })
  }
}
