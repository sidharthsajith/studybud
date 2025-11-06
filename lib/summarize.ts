// Client-side summarization using OpenRouter
export async function summarizeContent(content: string, title: string = ''): Promise<string> {
  if (!content?.trim()) {
    throw new Error('Content is required for summarization');
  }

  if (!process.env.NEXT_PUBLIC_OPENROUTER_API_KEY) {
    throw new Error('OpenRouter API key is not configured');
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
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
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter API error:", errorData);
      throw new Error(errorData.error?.message || "Failed to generate summary");
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "No summary was generated";
  } catch (error) {
    console.error("Error in summarization:", error);
    throw new Error(`Failed to summarize content: ${error instanceof Error ? error.message : String(error)}`);
  }
}
