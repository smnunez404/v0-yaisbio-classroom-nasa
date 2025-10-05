"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Loader2, AlertCircle } from "lucide-react"

interface PodcastPlayerProps {
  missionId: string
  level: string
  language: string
  onComplete?: () => void
}

export function PodcastPlayer({ missionId, level, language, onComplete }: PodcastPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isQuotaError, setIsQuotaError] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)

  const generatePodcast = async () => {
    setIsLoading(true)
    setError(null)
    setIsQuotaError(false)

    try {
      console.log("[v0] Requesting podcast generation...")
      const response = await fetch("/api/generate/podcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ missionId, level, language }),
      })

      if (!response.ok) {
        let errorData
        try {
          errorData = await response.json()
        } catch (jsonError) {
          console.error("[v0] Failed to parse error response:", jsonError)
          throw new Error(
            language === "es"
              ? "Error del servidor. Por favor, intenta más tarde."
              : "Server error. Please try again later.",
          )
        }

        if (response.status === 429 || errorData.error === "quota_exceeded") {
          setIsQuotaError(true)
          throw new Error(
            language === "es"
              ? "Límite de cuota de API alcanzado. Por favor, intenta más tarde."
              : "API quota limit reached. Please try again later.",
          )
        }

        throw new Error(errorData.message || errorData.error || "Failed to generate podcast")
      }

      const audioBlob = await response.blob()

      if (audioBlob.size === 0) {
        throw new Error(language === "es" ? "No se recibió audio del servidor" : "No audio received from server")
      }

      const url = URL.createObjectURL(audioBlob)
      setAudioUrl(url)
      console.log("[v0] Podcast generated successfully, size:", audioBlob.size, "bytes")
    } catch (err) {
      console.error("[v0] Podcast generation failed:", err)
      setError(err instanceof Error ? err.message : "Failed to generate podcast")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      setProgress(audio.currentTime)
      setDuration(audio.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      onComplete?.()
    }

    audio.addEventListener("timeupdate", updateProgress)
    audio.addEventListener("loadedmetadata", updateProgress)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", updateProgress)
      audio.removeEventListener("loadedmetadata", updateProgress)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [onComplete])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    audio.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0

  return (
    <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/50 rounded-xl p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="text-4xl">🎙️</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1">
            {language === "es" ? "Podcast de la Misión" : "Mission Podcast"}
          </h3>
          <p className="text-purple-200 text-sm">
            {language === "es"
              ? "Escucha la introducción narrada de tu misión"
              : "Listen to your mission's narrated introduction"}
          </p>
        </div>
      </div>

      {!audioUrl && !isLoading && (
        <button
          onClick={generatePodcast}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <Play className="w-5 h-5" />
          {language === "es" ? "Generar Podcast" : "Generate Podcast"}
        </button>
      )}

      {isLoading && (
        <div className="flex items-center justify-center gap-3 py-6">
          <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
          <span className="text-purple-200">
            {language === "es" ? "Generando podcast con IA..." : "Generating podcast with AI..."}
          </span>
        </div>
      )}

      {error && (
        <div
          className={`border rounded-lg p-4 ${isQuotaError ? "bg-yellow-500/20 border-yellow-500/50" : "bg-red-500/20 border-red-500/50"}`}
        >
          <div className="flex items-start gap-3">
            <AlertCircle className={`w-5 h-5 mt-0.5 ${isQuotaError ? "text-yellow-400" : "text-red-400"}`} />
            <div className="flex-1">
              <p className={`font-semibold mb-1 ${isQuotaError ? "text-yellow-200" : "text-red-200"}`}>
                {isQuotaError
                  ? language === "es"
                    ? "Límite de Cuota Alcanzado"
                    : "Quota Limit Reached"
                  : language === "es"
                    ? "Error al Generar"
                    : "Generation Error"}
              </p>
              <p className={`text-sm ${isQuotaError ? "text-yellow-300" : "text-red-300"}`}>{error}</p>
              {isQuotaError && (
                <p className="text-xs text-yellow-400 mt-2">
                  {language === "es"
                    ? "Nota: La función de podcast está en fase experimental y tiene límites de uso. Puedes continuar con la misión sin el audio."
                    : "Note: The podcast feature is experimental and has usage limits. You can continue with the mission without audio."}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {audioUrl && (
        <>
          <audio ref={audioRef} src={audioUrl} />

          <div className="space-y-4">
            <div className="relative h-2 bg-purple-900/50 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full transition-colors"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>

                <button onClick={toggleMute} className="text-purple-300 hover:text-white transition-colors">
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>

                <span className="text-purple-200 text-sm">
                  {formatTime(progress)} / {formatTime(duration)}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
