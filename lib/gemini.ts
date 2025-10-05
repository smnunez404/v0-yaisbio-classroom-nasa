// Gemini API integration for content generation

import { GoogleGenerativeAI } from "@google/generative-ai"
import type { DifficultyLevel, Language, Mission, Paper } from "@/types"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function generateNarrative(
  mission: Mission,
  paper: Paper,
  level: DifficultyLevel,
  language: Language,
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

  const levelDescriptions = {
    beginner: language === "es" ? "principiante (12-15 años)" : "beginner (ages 12-15)",
    intermediate: language === "es" ? "intermedio (16-18 años)" : "intermediate (ages 16-18)",
    advanced: language === "es" ? "avanzado (universitario)" : "advanced (university level)",
  }

  const prompt =
    language === "es"
      ? `Eres un narrador experto en educación científica. Crea una narrativa inmersiva de 200-250 palabras para una misión educativa sobre biología espacial.

Contexto:
- Título de la misión: ${mission.titleEs}
- Paper científico: ${paper.titleEs}
- Nivel: ${levelDescriptions[level]}
- Conceptos clave: ${mission.conceptsEs.join(", ")}

Requisitos:
1. Usa segunda persona ("Eres un/a...")
2. Crea un escenario espacial realista (ISS, laboratorio orbital, etc.)
3. Establece un desafío científico claro
4. Menciona los conceptos clave de forma natural
5. Tono inspirador pero accesible
6. Termina con una pregunta que motive a continuar

Genera solo la narrativa, sin títulos ni formato adicional.`
      : `You are an expert science education storyteller. Create an immersive 200-250 word narrative for an educational mission about space biology.

Context:
- Mission title: ${mission.title}
- Scientific paper: ${paper.title}
- Level: ${levelDescriptions[level]}
- Key concepts: ${mission.concepts.join(", ")}

Requirements:
1. Use second person ("You are a...")
2. Create a realistic space scenario (ISS, orbital lab, etc.)
3. Establish a clear scientific challenge
4. Mention key concepts naturally
5. Inspiring but accessible tone
6. End with a question that motivates continuation

Generate only the narrative, no titles or additional formatting.`

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2048,
    },
  })

  return result.response.text()
}

export async function generateLessons(
  mission: Mission,
  paper: Paper,
  level: DifficultyLevel,
  language: Language,
): Promise<any[]> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

  const prompt =
    language === "es"
      ? `Genera 3 lecciones educativas sobre: ${mission.titleEs}

Paper: ${paper.titleEs}
Nivel: ${level}
Conceptos: ${mission.conceptsEs.join(", ")}

Formato JSON:
[
  {
    "title": "Título de la lección",
    "content": "Contenido educativo (150-200 palabras)",
    "visualAid": "Descripción de imagen sugerida"
  }
]

Requisitos:
- Progresión lógica de conceptos
- Lenguaje apropiado para el nivel
- Ejemplos concretos
- Conexión con investigación real`
      : `Generate 3 educational lessons about: ${mission.title}

Paper: ${paper.title}
Level: ${level}
Concepts: ${mission.concepts.join(", ")}

JSON format:
[
  {
    "title": "Lesson title",
    "content": "Educational content (150-200 words)",
    "visualAid": "Suggested image description"
  }
]

Requirements:
- Logical concept progression
- Language appropriate for level
- Concrete examples
- Connection to real research`

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2048,
    },
  })

  const text = result.response.text()
  // Extract JSON from markdown code blocks if present
  const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/\[[\s\S]*\]/)
  return JSON.parse(jsonMatch ? jsonMatch[1] || jsonMatch[0] : text)
}

export async function generateQuestions(mission: Mission, level: DifficultyLevel, language: Language): Promise<any[]> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

  const prompt =
    language === "es"
      ? `Genera 5 preguntas educativas sobre: ${mission.titleEs}

Nivel: ${level}
Conceptos: ${mission.conceptsEs.join(", ")}

Formato JSON:
[
  {
    "text": "Pregunta",
    "type": "multiple-choice",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": "A",
    "explanation": "Explicación de la respuesta correcta"
  }
]

Requisitos:
- 3 opción múltiple, 2 abiertas
- Dificultad apropiada
- Explicaciones educativas
- Evalúan comprensión real`
      : `Generate 5 educational questions about: ${mission.title}

Level: ${level}
Concepts: ${mission.concepts.join(", ")}

JSON format:
[
  {
    "text": "Question",
    "type": "multiple-choice",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": "A",
    "explanation": "Explanation of correct answer"
  }
]

Requirements:
- 3 multiple choice, 2 open-ended
- Appropriate difficulty
- Educational explanations
- Test real understanding`

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2048,
    },
  })

  const text = result.response.text()
  const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/\[[\s\S]*\]/)
  return JSON.parse(jsonMatch ? jsonMatch[1] || jsonMatch[0] : text)
}

export async function evaluateAnswer(
  answer: string,
  expectedConcepts: string[],
  language: Language,
): Promise<{ score: number; feedback: string }> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

  const prompt =
    language === "es"
      ? `Evalúa esta respuesta de estudiante:

Respuesta: "${answer}"
Conceptos esperados: ${expectedConcepts.join(", ")}

Proporciona:
1. Puntuación (0-100)
2. Feedback constructivo (50-100 palabras)

Formato JSON:
{
  "score": 85,
  "feedback": "Tu respuesta demuestra..."
}`
      : `Evaluate this student answer:

Answer: "${answer}"
Expected concepts: ${expectedConcepts.join(", ")}

Provide:
1. Score (0-100)
2. Constructive feedback (50-100 words)

JSON format:
{
  "score": 85,
  "feedback": "Your answer demonstrates..."
}`

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 512,
    },
  })

  const text = result.response.text()
  const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/\{[\s\S]*\}/)
  return JSON.parse(jsonMatch ? jsonMatch[1] || jsonMatch[0] : text)
}
