import type { Paper } from "@/types"
import { rawPapersData } from "./all-papers-raw"

// Parse the raw CSV data into Paper objects
function parsePapers(): Paper[] {
  const lines = rawPapersData.trim().split("\n")
  const papers: Paper[] = []

  // Skip header line
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    // Handle CSV with potential commas in titles (enclosed in quotes)
    const match = line.match(/^"?([^"]+)"?,(.+)$/) || line.match(/^([^,]+),(.+)$/)

    if (match) {
      const title = match[1].replace(/^"|"$/g, "").trim()
      const link = match[2].trim()

      // Extract PMC ID from link
      const pmcMatch = link.match(/PMC(\d+)/)
      const pmcId = pmcMatch ? pmcMatch[1] : null

      // Generate basic keywords from title for categorization
      const keywords = title
        .toLowerCase()
        .split(/[\s,\-:()]+/)
        .filter((word) => word.length > 3)
        .slice(0, 5)

      // Auto-categorize based on keywords
      let category: Paper["category"] = "space-biology"
      if (keywords.some((k) => ["bone", "muscle", "skeletal", "osteo", "calcium"].includes(k))) {
        category = "musculoskeletal"
      } else if (keywords.some((k) => ["plant", "arabidopsis", "root", "seed", "growth"].includes(k))) {
        category = "plant-biology"
      } else if (keywords.some((k) => ["immune", "cell", "lymph", "antibody", "macrophage"].includes(k))) {
        category = "immunology"
      } else if (keywords.some((k) => ["microb", "bacteria", "fungal", "yeast", "pathogen"].includes(k))) {
        category = "microbiology"
      } else if (keywords.some((k) => ["radiation", "cosmic", "dna", "damage", "repair"].includes(k))) {
        category = "radiation-biology"
      } else if (keywords.some((k) => ["gene", "transcript", "protein", "expression", "genomic"].includes(k))) {
        category = "genomics"
      }

      papers.push({
        id: `paper-${i}`,
        title,
        titleEs: title, // Will be translated by Gemini when needed
        authors: "NASA GeneLab Research Team",
        year: 2024,
        journal: "NASA GeneLab",
        pmcLink: link,
        pmcId: pmcId || undefined,
        category,
        keywords,
        abstract:
          "This research paper from NASA's GeneLab explores the effects of spaceflight and microgravity on biological systems.",
        abstractEs:
          "Este artículo de investigación del GeneLab de la NASA explora los efectos del vuelo espacial y la microgravedad en los sistemas biológicos.",
      })
    }
  }

  return papers
}

// Export all 608 papers
export const allPapers = parsePapers()

export const papers = allPapers

// Export papers by category for easier filtering
export const papersByCategory = {
  all: allPapers,
  "space-biology": allPapers.filter((p) => p.category === "space-biology"),
  musculoskeletal: allPapers.filter((p) => p.category === "musculoskeletal"),
  "plant-biology": allPapers.filter((p) => p.category === "plant-biology"),
  immunology: allPapers.filter((p) => p.category === "immunology"),
  microbiology: allPapers.filter((p) => p.category === "microbiology"),
  "radiation-biology": allPapers.filter((p) => p.category === "radiation-biology"),
  genomics: allPapers.filter((p) => p.category === "genomics"),
}

// Helper function to get random papers
export function getRandomPapers(count: number): Paper[] {
  const shuffled = [...allPapers].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

// Helper function to search papers
export function searchPapers(query: string): Paper[] {
  const lowerQuery = query.toLowerCase()
  return allPapers.filter(
    (paper) =>
      paper.title.toLowerCase().includes(lowerQuery) ||
      paper.keywords.some((k) => k.includes(lowerQuery)) ||
      paper.category.includes(lowerQuery),
  )
}
