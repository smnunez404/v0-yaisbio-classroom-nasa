// Script to parse the 608 papers and generate structured data
import { rawPapersData } from "../lib/data/all-papers-raw"

interface ParsedPaper {
  id: string
  title: string
  link: string
}

function parsePapers(): ParsedPaper[] {
  const lines = rawPapersData.trim().split("\n")
  const papers: ParsedPaper[] = []

  // Skip header line
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    // Handle CSV with potential commas in titles (enclosed in quotes)
    const match = line.match(/^"?([^"]+)"?,(.+)$/) || line.match(/^([^,]+),(.+)$/)

    if (match) {
      const title = match[1].replace(/^"|"$/g, "").trim()
      const link = match[2].trim()

      papers.push({
        id: `paper-${i}`,
        title,
        link,
      })
    }
  }

  return papers
}

const allPapers = parsePapers()
console.log(`[v0] Parsed ${allPapers.length} papers`)
console.log(`[v0] First paper:`, allPapers[0])
console.log(`[v0] Last paper:`, allPapers[allPapers.length - 1])

export { allPapers }
