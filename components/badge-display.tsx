"use client"

import type { Badge } from "@/types"
import { Card } from "@/components/ui/card"
import { Award, Lock } from "lucide-react"

interface BadgeDisplayProps {
  badges: Badge[]
  earnedBadgeIds: string[]
  language: string
}

export function BadgeDisplay({ badges, earnedBadgeIds, language }: BadgeDisplayProps) {
  const earnedSet = new Set(earnedBadgeIds)

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {badges.map((badge) => {
        const isEarned = earnedSet.has(badge.id)

        return (
          <Card
            key={badge.id}
            className={`p-4 text-center transition-all ${
              isEarned
                ? "bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-purple-500/50"
                : "bg-muted/50 opacity-60"
            }`}
          >
            <div className="flex justify-center mb-3">
              {isEarned ? (
                <Award className="w-12 h-12 text-yellow-500" />
              ) : (
                <Lock className="w-12 h-12 text-muted-foreground" />
              )}
            </div>
            <h3 className="font-semibold text-sm mb-1">{language === "es" ? badge.nameEs : badge.name}</h3>
            <p className="text-xs text-muted-foreground">
              {language === "es" ? badge.descriptionEs : badge.description}
            </p>
            {isEarned && (
              <div className="mt-2 text-xs text-green-500 font-medium">
                {language === "es" ? "¡Desbloqueado!" : "Unlocked!"}
              </div>
            )}
          </Card>
        )
      })}
    </div>
  )
}
