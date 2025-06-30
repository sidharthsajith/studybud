import { generateFlashcards } from "@/lib/ai-service"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic' // Ensure this route is not statically generated

export async function POST(req: Request) {
  const requestId = Math.random().toString(36).substring(2, 8);
  
  try {
    console.log(`[${requestId}] [FLASHCARDS_POST] Request received`);
    
    const body = await req.json();
    console.log(`[${requestId}] [FLASHCARDS_POST] Request body:`, JSON.stringify(body, null, 2));
    
    const { content } = body;
    
    if (!content) {
      console.error(`[${requestId}] [FLASHCARDS_POST] No content provided in request`);
      return new NextResponse("Content is required", { status: 400 })
    }

    console.log(`[${requestId}] [FLASHCARDS_POST] Generating flashcards for content (length: ${content.length})`);
    
    const startTime = Date.now();
    const flashcards = await generateFlashcards(content);
    const endTime = Date.now();
    
    console.log(`[${requestId}] [FLASHCARDS_POST] Successfully generated ${flashcards.length} flashcards in ${endTime - startTime}ms`);
    console.log(`[${requestId}] [FLASHCARDS_POST] Generated flashcards:`, JSON.stringify(flashcards, null, 2));

    return NextResponse.json({ 
      success: true,
      count: flashcards.length,
      flashcards 
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorName = error instanceof Error ? error.name : 'Error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error(`[${requestId}] [FLASHCARDS_POST] Error:`, error);
    console.error(`[${requestId}] [FLASHCARDS_POST] Error details:`, {
      name: errorName,
      message: errorMessage,
      stack: errorStack
    });
    
    return new NextResponse(
      JSON.stringify({ 
        success: false,
        error: "Failed to generate flashcards",
        details: errorMessage 
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  } finally {
    console.log(`[${requestId}] [FLASHCARDS_POST] Request completed`);
  }
}
