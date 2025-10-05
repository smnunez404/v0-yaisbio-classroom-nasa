import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"

export async function POST(request: NextRequest) {
  try {
    const { title, description, language } = await request.json()

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 })
    }

    const prompt =
      language === "es"
        ? `Eres un científico de la NASA evaluando una propuesta de experimento espacial. 
         
         Título: ${title}
         Descripción: ${description}
         
         Proporciona feedback constructivo en 3-4 oraciones sobre:
         1. Viabilidad científica
         2. Relevancia para investigación espacial
         3. Sugerencias de mejora
         
         Sé alentador pero honesto.`
        : `You are a NASA scientist evaluating a space experiment proposal.
         
         Title: ${title}
         Description: ${description}
         
         Provide constructive feedback in 3-4 sentences about:
         1. Scientific feasibility
         2. Relevance to space research
         3. Suggestions for improvement
         
         Be encouraging but honest.`

    const { text } = await generateText({
      model: "gemini-1.5-pro",
      prompt,
      maxTokens: 300,
    })

    return NextResponse.json({ feedback: text })
  } catch (error) {
    console.error("Error evaluating proposal:", error)
    return NextResponse.json({ error: "Failed to evaluate proposal" }, { status: 500 })
  }
}
