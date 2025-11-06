// Voice service for handling audio processing with OpenRouter

// Default model for audio processing
const DEFAULT_AUDIO_MODEL = 'google/gemini-2.5-flash';

interface TranscriptionResponse {
  text: string;
  language?: string;
  duration?: number;
}

interface AnalysisResult {
  keyConcepts: string[];
  sentiment: {
    score: number;
    label: string;
  };
  engagement: {
    questions: string[];
    examples: string[];
    interactiveElements: string[];
  };
  actionItems: string[];
  suggestedTopics?: string[];
}

export async function transcribeAudio(audioBlob: Blob): Promise<TranscriptionResponse> {
  try {
    // Convert blob to base64
    const arrayBuffer = await audioBlob.arrayBuffer();
    const base64Audio = Buffer.from(arrayBuffer).toString('base64');
    const mimeType = audioBlob.type || 'audio/mp3';

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'StudyBud',
      },
      body: JSON.stringify({
        model: DEFAULT_AUDIO_MODEL,
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: 'Transcribe this audio file accurately' },
              {
                type: 'input_audio',
                input_audio: {
                  data: base64Audio,
                  format: mimeType.split('/')[1] || 'mp3',
                },
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to transcribe audio');
    }

    const data = await response.json();
    const transcription = data.choices[0]?.message?.content;

    if (!transcription) {
      throw new Error('No transcription returned from API');
    }

    return {
      text: transcription,
      language: 'en',
      duration: 0, // Calculate from audio blob if needed
    };
  } catch (error) {
    console.error('Error transcribing audio:', error);
    throw new Error('Failed to transcribe audio');
  }
}

export async function analyzeTranscription(text: string): Promise<AnalysisResult> {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'StudyBud',
      },
      body: JSON.stringify({
        model: DEFAULT_AUDIO_MODEL,
        messages: [
          {
            role: 'user',
            content: `Analyze the following transcription and provide a structured JSON response with these categories:
            1. keyConcepts: Array of main topics and ideas
            2. sentiment: Object with score (-1 to 1) and label (positive/negative/neutral)
            3. engagement: Object containing questions, examples, and interactiveElements arrays
            4. actionItems: Array of tasks or follow-ups mentioned
            5. suggestedTopics: Array of related subjects for further learning
            
            Transcription: ${text.substring(0, 15000)}`
          }
        ],
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to analyze transcription');
    }

    const data = await response.json();
    const result = data.choices[0]?.message?.content;
    
    if (!result) {
      throw new Error('No analysis returned from API');
    }

    const analysis = typeof result === 'string' ? JSON.parse(result) : result;

    // Ensure the response has the expected structure
    return {
      keyConcepts: Array.isArray(analysis.keyConcepts) ? analysis.keyConcepts : [],
      sentiment: {
        score: analysis.sentiment?.score ?? 0,
        label: analysis.sentiment?.label || 'neutral',
      },
      engagement: {
        questions: Array.isArray(analysis.engagement?.questions) ? analysis.engagement.questions : [],
        examples: Array.isArray(analysis.engagement?.examples) ? analysis.engagement.examples : [],
        interactiveElements: Array.isArray(analysis.engagement?.interactiveElements) 
          ? analysis.engagement.interactiveElements 
          : [],
      },
      actionItems: Array.isArray(analysis.actionItems) ? analysis.actionItems : [],
      suggestedTopics: Array.isArray(analysis.suggestedTopics) ? analysis.suggestedTopics : [],
    };
  } catch (error) {
    console.error('Error analyzing transcription:', error);
    throw new Error('Failed to analyze transcription');
  }
}

export async function generateStudyMaterials(
  text: string,
  type: 'summary' | 'flashcards' | 'quiz' | 'notes'
): Promise<string> {
  try {
    const prompts = {
      summary: 'Create a concise summary of the following content, highlighting key points and main ideas.',
      flashcards: 'Generate flashcards for the following content. Each flashcard should have a clear question and answer.',
      quiz: 'Create a quiz based on the following content. Include multiple choice questions with 4 options each.',
      notes: 'Create organized study notes from the following content, using headings, bullet points, and clear sections.'
    };

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'StudyBud',
      },
      body: JSON.stringify({
        model: DEFAULT_AUDIO_MODEL,
        messages: [
          {
            role: 'user',
            content: `${prompts[type]}\n\n${text.substring(0, 15000)}`
          }
        ]
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || `Failed to generate ${type}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || `No ${type} generated.`;
  } catch (error) {
    console.error(`Error generating ${type}:`, error);
    throw new Error(`Failed to generate ${type}`);
  }
}
