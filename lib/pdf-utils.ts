// Client-side PDF processing using OpenRouter
type PDFAnalysisOptions = {
  action: 'summarize' | 'extract-text' | 'generate-notes' | 'qna';
  prompt?: string;
};

// Function to read file as base64
function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1];
      resolve(base64String);
    };
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      reject(new Error('Failed to read file'));
    };
    reader.readAsDataURL(file);
  });
}

export async function processPdf(pdfFile: File, options: PDFAnalysisOptions): Promise<string> {
  try {
    if (!pdfFile) {
      throw new Error('PDF file is required');
    }

    if (!process.env.NEXT_PUBLIC_OPENROUTER_API_KEY) {
      throw new Error('OpenRouter API key is not configured');
    }

    // Read the file as base64
    const fileContent = await readFileAsBase64(pdfFile);

    // System prompts for different actions
    const systemPrompts = {
      'summarize': 'You are an expert at summarizing documents. Provide a clear and concise summary of the key points in this PDF.',
      'extract-text': 'Extract all text from this PDF exactly as it appears. Preserve the formatting and structure as much as possible.',
      'generate-notes': 'You are a study assistant. Generate organized study notes from this PDF, with clear headings and bullet points.',
      'qna': 'You are an expert at answering questions about documents. Answer the user\'s question based on the content of this PDF.'
    };

    const systemPrompt = systemPrompts[options.action] || systemPrompts.summarize;
    const userPrompt = options.prompt || `Please process this PDF document (${pdfFile.name})`;
    
    // Send the extracted text to OpenRouter for processing
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
              { 
                type: "text", 
                text: userPrompt
              },
              {
                type: "file",
                file: {
                  filename: pdfFile.name,
                  fileData: `data:application/pdf;base64,${fileContent}`
                }
              },
            ],
          },
        ],
        max_tokens: 4000,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      let errorMessage = 'Failed to process PDF';
      try {
        const errorData = await response.json();
        console.error('OpenRouter API error response:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData,
          headers: Object.fromEntries(response.headers.entries())
        });
        errorMessage = errorData.error?.message || JSON.stringify(errorData);
      } catch (e) {
        const errorText = await response.text();
        console.error('Failed to parse error response:', {
          status: response.status,
          statusText: response.statusText,
          errorText,
          headers: Object.fromEntries(response.headers.entries())
        });
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "No content was generated";
  } catch (error) {
    console.error("Error in PDF processing:", error);
    throw new Error(`Failed to process PDF: ${error instanceof Error ? error.message : String(error)}`);
  }
}
