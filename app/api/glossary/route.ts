import { type NextRequest, NextResponse } from "next/server"
import { glossaryTerms } from "@/lib/data/glossary"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const term = searchParams.get("term")
    const lang = searchParams.get("lang") || "es"

    if (term) {
      // Search for specific term
      const results = glossaryTerms.filter((t) => {
        const searchTerm = term.toLowerCase()
        if (lang === "es") {
          return t.term.toLowerCase().includes(searchTerm) || t.definition.toLowerCase().includes(searchTerm)
        } else {
          return t.termEn.toLowerCase().includes(searchTerm) || t.definitionEn.toLowerCase().includes(searchTerm)
        }
      })
      return NextResponse.json({ terms: results })
    }

    // Return all terms
    return NextResponse.json({ terms: glossaryTerms })
  } catch (error) {
    console.error("Error fetching glossary:", error)
    return NextResponse.json({ error: "Failed to fetch glossary" }, { status: 500 })
  }
}
