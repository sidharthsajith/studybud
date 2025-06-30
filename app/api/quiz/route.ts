import { generateQuiz } from "@/lib/ai-service"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { notes } = await req.json()
    if (!notes) {
      return new NextResponse("Notes are required", { status: 400 })
    }

    const quiz = await generateQuiz(notes)
    return NextResponse.json({ quiz })
  } catch (error) {
    console.error("[QUIZ_POST]", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
