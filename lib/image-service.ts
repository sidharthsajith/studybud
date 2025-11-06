import OpenAI from 'openai';

// Initialize OpenAI client configured for OpenRouter
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || "",
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    'X-Title': 'StudyBud',
  },
});

// Default model for image analysis
const DEFAULT_VISION_MODEL = 'llava-hf/llava-1.5-7b-hf';

/**
 * Analyze an image and return a description
 * @param imageUrl - URL of the image to analyze
 * @param prompt - Optional custom prompt for the analysis
 * @returns A description of the image
 */
export async function analyzeImage(imageUrl: string, prompt = ""): Promise<string> {
  try {
    const defaultPrompt = "Analyze this image and describe what you see in detail."
    const userPrompt = prompt || defaultPrompt

    const response = await openai.chat.completions.create({
      model: DEFAULT_VISION_MODEL,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: userPrompt },
            {
              type: "image_url",
              image_url: imageUrl,
            },
          ],
        },
      ],
      max_tokens: 1024,
    });

    return response.choices[0].message?.content || "No description available.";
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw new Error("Failed to analyze image");
  }
}

/**
 * Extract text from an image using OCR
 * @param imageUrl - URL of the image containing text
 * @returns The extracted text from the image
 */
export async function extractTextFromImage(imageUrl: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: DEFAULT_VISION_MODEL,
      messages: [
        {
          role: "user",
          content: [
            { 
              type: "text", 
              text: "Extract all text from this image. Output only the text content, with no additional commentary or formatting." 
            },
            {
              type: "image_url",
              image_url: imageUrl,
            },
          ],
        },
      ],
      max_tokens: 1024,
    });

    return response.choices[0].message?.content || "No text found in the image.";
  } catch (error) {
    console.error("Error extracting text from image:", error);
    throw new Error("Failed to extract text from image");
  }
}

/**
 * Analyze study material in an image
 * @param imageUrl - URL of the image containing study material
 * @returns Analysis of the study material
 */
export async function analyzeStudyMaterial(imageUrl: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: DEFAULT_VISION_MODEL,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "This is a study material. Analyze it and provide the following:\n" +
                "1) Main topic and subject area\n" +
                "2) Key concepts covered\n" +
                "3) Suggested study questions based on this material\n" +
                "4) Any formulas or important definitions present\n" +
                "5) Recommendations for further study"
            },
            {
              type: "image_url",
              image_url: imageUrl,
            },
          ],
        },
      ],
      max_tokens: 1500,
    });

    return response.choices[0].message?.content || "Unable to analyze study material.";
  } catch (error) {
    console.error("Error analyzing study material:", error);
    throw new Error("Failed to analyze study material");
  }
}

/**
 * Solve problems or answer questions from an image
 * @param imageUrl - URL of the image containing a problem or question
 * @returns The solution with step-by-step explanation
 */
export async function solveProblemsFromImage(imageUrl: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: DEFAULT_VISION_MODEL,
      messages: [
        {
          role: "user",
          content: [
            { 
              type: "text", 
              text: "This image contains a problem or question. Please solve it and explain your reasoning step by step." 
            },
            {
              type: "image_url",
              image_url: imageUrl,
            },
          ],
        },
      ],
      max_tokens: 1024,
    });

    return response.choices[0].message?.content || "Unable to solve the problem from the image.";
  } catch (error) {
    console.error("Error solving problem from image:", error);
    throw new Error("Failed to solve problem from image");
  }
}
