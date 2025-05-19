import { type NextRequest, NextResponse } from "next/server"
import {
  generateCompletion,
  generateStudyMaterials,
  analyzeWriting,
  identifyKnowledgeGaps,
  generateResearchQuestions,
} from "@/lib/ai-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, content, type } = body

    let result

    switch (action) {
      case "completion":
        result = await generateCompletion(content)
        break
      case "study-materials":
        result = await generateStudyMaterials(content, type)
        break
      case "analyze-writing":
        result = await analyzeWriting(content)
        break
      case "knowledge-gaps":
        result = await identifyKnowledgeGaps(content.notes, content.quizResults)
        break
      case "research-questions":
        result = await generateResearchQuestions(content)
        break
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    return NextResponse.json({ result })
  } catch (error) {
    console.error("API route error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
