"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import type { Language } from "@/types"

interface LanguageContextType {
  language: Language
  changeLanguage: (lang: Language) => void
  isLoaded: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>("es")
  const [isLoaded, setIsLoaded] = useState(false)

  // Cargar idioma desde localStorage al inicializar
  useEffect(() => {
    const savedLanguage = localStorage.getItem("yaisbio_language") as Language | null
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
    setIsLoaded(true)
  }, [])

  // Guardar idioma en localStorage cuando cambie
  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem("yaisbio_language", newLanguage)
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, isLoaded }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
