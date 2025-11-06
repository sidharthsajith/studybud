// Client-side image analysis using OpenRouter
type ImageAnalysisOptions = {
  action: 'analyze' | 'extract-text' | 'analyze-study-material' | 'solve-problems';
  prompt?: string;
};

export async function analyzeImage(imageUrl: string, options: ImageAnalysisOptions): Promise<string> {
  try {
    if (!imageUrl) {
      throw new Error('Image URL is required');
    }

    if (!process.env.NEXT_PUBLIC_OPENROUTER_API_KEY) {
      throw new Error('OpenRouter API key is not configured');
    }

    // Convert the action to a system prompt
    const systemPrompts = {
      'analyze': 'You are an expert at analyzing images. Provide a detailed description of what you see in the image.',
      'extract-text': 'Extract all text from this image exactly as it appears. Do not add any interpretation or analysis, just the raw text.',
      'analyze-study-material': 'You are an expert educator. Analyze this study material and explain the key concepts in a clear, structured way.',
      'solve-problems': 'You are a problem-solving expert. Analyze the problem shown in this image and provide a step-by-step solution.'
    };

    const systemPrompt = options.prompt || systemPrompts[options.action] || systemPrompts.analyze;

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
            content: systemPrompt,
          },
          {
            role: "user",
            content: [
              { type: "text", text: options.prompt || systemPrompt },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl,
                },
              },
            ],
          },
        ],
        max_tokens: 2000,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter API error:", errorData);
      throw new Error(errorData.error?.message || "Failed to analyze image");
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "No analysis was generated";
  } catch (error) {
    console.error("Error in image analysis:", error);
    throw new Error(`Failed to analyze image: ${error instanceof Error ? error.message : String(error)}`);
  }
}
