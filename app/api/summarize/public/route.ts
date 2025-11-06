import { NextResponse } from "next/server"

// This is a public endpoint that doesn't require authentication
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const { content, title } = await request.json()

    if (!content || !content.trim()) {
      return NextResponse.json({ error: "Content is required for summarization" }, { status: 400 })
    }

    // Call OpenRouter API for summarization
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        "X-Title": 'StudyBud',
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-001",
        messages: [
          {
            role: "system",
            content:
              "You are an expert at summarizing notes and academic content. Provide clear, concise summaries that capture the key points and main ideas. Format your response in a well-structured manner with bullet points or numbered lists when appropriate.",
          },
          {
            role: "user",
            content: `Please summarize the following notes${title ? ` titled "${title}"` : ''}:\n\n${content}`,
          },
        ],
        max_tokens: 1000,
        temperature: 0.3,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("OpenRouter API error:", errorData)
      throw new Error(errorData.error?.message || "Failed to generate summary")
    }

    const data = await response.json()
    const summary = data.choices[0].message.content

    return NextResponse.json({ summary })
  } catch (error: any) {
    console.error("Error in summarization:", error)
    return NextResponse.json(
      { error: error.message || "Failed to summarize content" },
      { status: 500 }
    )
  }
}
