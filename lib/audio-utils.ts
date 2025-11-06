// Client-side audio processing using OpenRouter
type AudioAnalysisOptions = {
  action: 'transcribe' | 'summarize' | 'generate-notes' | 'extract-key-points';
  prompt?: string;
};

export async function processAudio(audioFile: File, options: AudioAnalysisOptions): Promise<string> {
  try {
    if (!audioFile) {
      throw new Error('Audio file is required');
    }

    if (!process.env.NEXT_PUBLIC_OPENROUTER_API_KEY) {
      throw new Error('OpenRouter API key is not configured');
    }

    // Convert audio file to base64
    const arrayBuffer = await audioFile.arrayBuffer();
    const base64Audio = Buffer.from(arrayBuffer).toString('base64');
    const mimeType = audioFile.type || 'audio/mp3';

    // System prompts for different actions
    const systemPrompts = {
      'transcribe': 'You are a professional transcriptionist. Transcribe the following audio with high accuracy, including filler words and speech disfluencies.',
      'summarize': 'You are an expert at summarizing audio content. Provide a clear and concise summary of the key points.',
      'generate-notes': 'You are a study assistant. Generate organized study notes from this audio content, with clear headings and bullet points.',
      'extract-key-points': 'You are an expert at extracting key information. List the main points and important details from this audio.'
    };

    const systemPrompt = options.prompt || systemPrompts[options.action] || systemPrompts.transcribe;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        "X-Title": 'StudyBud',
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
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
                type: "input_audio",
                input_audio: {
                  data: base64Audio,
                  format: mimeType.split('/')[1] || 'mp3',
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
      throw new Error(errorData.error?.message || "Failed to process audio");
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "No content was generated";
  } catch (error) {
    console.error("Error in audio processing:", error);
    throw new Error(`Failed to process audio: ${error instanceof Error ? error.message : String(error)}`);
  }
}
