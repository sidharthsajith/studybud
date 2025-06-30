import { generateFlashcards } from "@/lib/ai-service"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { notes } = await req.json()
    if (!notes) {
      return new NextResponse("Notes are required", { status: 400 })
    }

    const flashcards = await generateFlashcards(notes)
    return NextResponse.json({ flashcards })
  } catch (error) {
    console.error("[FLASHCARDS_POST]", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
