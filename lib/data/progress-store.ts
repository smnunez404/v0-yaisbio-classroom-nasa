// In-memory progress store for MVP
// In production, this should be replaced with a database

export interface CompletedMission {
  missionId: string
  level: string
  language: string
  score: number
  completedAt: Date
}

export interface UserProgress {
  code: string
  completedMissions: CompletedMission[]
  badges: string[]
  totalQuestionsAnswered: number
  createdAt: Date
  lastActive: Date
}

class ProgressStore {
  private store: Map<string, UserProgress> = new Map()

  generateCode(): string {
    return Math.random().toString(36).substring(2, 10).toUpperCase()
  }

  create(): UserProgress {
    const code = this.generateCode()
    const progress: UserProgress = {
      code,
      completedMissions: [],
      badges: [],
      totalQuestionsAnswered: 0,
      createdAt: new Date(),
      lastActive: new Date(),
    }
    this.store.set(code, progress)
    return progress
  }

  get(code: string): UserProgress | undefined {
    return this.store.get(code)
  }

  update(code: string, progress: UserProgress): void {
    progress.lastActive = new Date()
    this.store.set(code, progress)
  }

  addCompletedMission(code: string, mission: CompletedMission): void {
    const progress = this.get(code)
    if (progress) {
      progress.completedMissions.push(mission)
      this.update(code, progress)
    }
  }

  incrementQuestions(code: string, count: number): void {
    const progress = this.get(code)
    if (progress) {
      progress.totalQuestionsAnswered += count
      this.update(code, progress)
    }
  }
}

export const progressStore = new ProgressStore()
