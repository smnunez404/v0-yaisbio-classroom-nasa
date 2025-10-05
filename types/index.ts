// Core type definitions for YaisBio Classroom

export type Language = "es" | "en"

export type DifficultyLevel = "beginner" | "intermediate" | "advanced"

export interface Paper {
  id: string
  title: string
  titleEs: string
  link: string
  summary: string
  summaryEs: string
  keywords: string[]
  keywordsEs: string[]
}

export interface Mission {
  id: string
  paperId: string
  title: string
  titleEs: string
  description: string
  descriptionEs: string
  level: DifficultyLevel
  duration: number // minutes
  thumbnail: string
  concepts: string[]
  conceptsEs: string[]
  researchGap: string
  researchGapEs: string
}

export interface GeneratedModule {
  id: string
  missionId: string
  level: DifficultyLevel
  language: Language
  narrative: string
  lessons: Lesson[]
  questions: Question[]
  generatedAt: Date
}

export interface Lesson {
  id: string
  title: string
  content: string
  visualAid?: string
}

export interface Question {
  id: string
  text: string
  type: "multiple-choice" | "open-ended"
  options?: string[]
  correctAnswer?: string
  explanation: string
}

export interface UserProgress {
  code: string
  completedMissions: string[]
  currentMission?: string
  currentStep?: number
  answers: Record<string, any>
  badges: string[]
  language: Language
  createdAt: Date
  updatedAt: Date
}

export interface Badge {
  id: string
  name: string
  nameEs: string
  description: string
  descriptionEs: string
  icon: string
  category: "first-steps" | "specialist" | "difficulty" | "knowledge" | "community" | "special"
  criteria: string
}

export interface GlossaryTerm {
  id: string
  term: string
  termEs: string
  definition: string
  definitionEs: string
  relatedMissions: string[]
}
