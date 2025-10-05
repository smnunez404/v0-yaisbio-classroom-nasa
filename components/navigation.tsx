"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

interface NavigationProps {
  language: "es" | "en"
  onLanguageChange: (lang: "es" | "en") => void
}

export function Navigation({ language, onLanguageChange }: NavigationProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: language === "es" ? "Inicio" : "Home" },
    { href: "/missions", label: language === "es" ? "Misiones" : "Missions" },
    { href: "/dashboard", label: language === "es" ? "Mi Progreso" : "My Progress" },
    { href: "/glossary", label: language === "es" ? "Glosario" : "Glossary" },
    { href: "/propose", label: language === "es" ? "Proponer" : "Propose" },
  ]

  return (
    <nav className="bg-slate-900/80 backdrop-blur-lg border-b border-purple-500/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl">🚀</div>
            <span className="text-white font-bold text-xl hidden md:block">YaisBio Classroom</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.href ? "text-green-400" : "text-purple-200 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Language Toggle */}
          <button
            onClick={() => onLanguageChange(language === "es" ? "en" : "es")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            {language === "es" ? "🇪🇸 ES" : "🇬🇧 EN"}
          </button>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-purple-500/20">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-sm font-medium transition-colors ${
                  pathname === item.href ? "text-green-400" : "text-purple-200 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
