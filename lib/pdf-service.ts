import OpenAI from 'openai';
import { Readable } from 'stream';

// Initialize OpenAI client configured for OpenRouter
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || "",
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    'X-Title': 'StudyBud',
  },
});

// Default model for PDF processing
const DEFAULT_MODEL = 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo';

/**
 * Extract text from a PDF file
 * @param file - The PDF file to extract text from
 * @returns The extracted text
 */
export async function extractTextFromPdf(file: File): Promise<string> {
  try {
    // In a real implementation, you would use a PDF parsing library like pdf-parse
    // This is a simplified example that simulates text extraction
    
    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Simulate text extraction (replace with actual PDF parsing)
    const text = `[Simulated PDF content from ${file.name}]\n\n` +
      `This is a simulated extraction of text from the PDF. In a real implementation, ` +
      `you would use a PDF parsing library to extract the actual content.`;
    
    return text;
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    throw new Error("Failed to extract text from PDF");
  }
}

/**
 * Analyze a PDF document and provide a summary
 * @param text - The extracted text from the PDF
 * @returns A structured analysis of the PDF content
 */
export async function analyzePdfContent(text: string) {
  try {
    const prompt = `Analyze the following document and provide a structured summary with these sections:
    1. Document Title
    2. Main Topic/Subject
    3. Key Points (bullet points)
    4. Important Details/Findings
    5. Key Terms/Concepts
    6. Potential Study Questions
    
    Document: "${text}"`;

    const response = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2000,
    });

    return response.choices[0].message?.content || "Unable to analyze the document.";
  } catch (error) {
    console.error("Error analyzing PDF content:", error);
    throw new Error("Failed to analyze PDF content");
  }
}

/**
 * Generate study materials from PDF content
 * @param text - The extracted text from the PDF
 * @param type - The type of study materials to generate
 * @returns The generated study materials
 */
export async function generateStudyMaterialsFromPdf(
  text: string,
  type: "summary" | "flashcards" | "quiz" | "key_points"
): Promise<string> {
  try {
    let prompt = "";
    
    switch (type) {
      case "summary":
        prompt = `Create a comprehensive summary of the following document with these sections:
        1. Main Topic
        2. Key Concepts
        3. Important Details
        4. Conclusions/Key Takeaways
        
        Document: ${text}`;
        break;
        
      case "flashcards":
        prompt = `Create 10 flashcards in this format:
        
        Q: [Question]
        A: [Answer]
        
        Based on this document: ${text}
        
        Focus on key concepts, definitions, and important facts.`;
        break;
        
      case "quiz":
        prompt = `Create a 10-question quiz with answers based on this document. For each question:
        1. Include 4 multiple-choice options
        2. Mark the correct answer with (*)
        3. Provide a brief explanation
        
        Document: ${text}`;
        break;
        
      case "key_points":
        prompt = `Extract and list the key points from this document in a clear, concise manner:
        
        Document: ${text}`;
        break;
    }

    const response = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [{ role: "user", content: prompt }],
      max_tokens: type === "flashcards" ? 1500 : 2000,
    });

    return response.choices[0].message?.content || `Failed to generate ${type}.`;
  } catch (error) {
    console.error(`Error generating ${type} from PDF:`, error);
    throw new Error(`Failed to generate ${type} from PDF`);
  }
}

/**
 * Convert PDF to markdown format
 * @param text - The extracted text from the PDF
 * @returns The content formatted in markdown
 */
export async function convertPdfToMarkdown(text: string): Promise<string> {
  try {
    const prompt = `Convert the following document content into well-structured markdown format with appropriate headings, lists, and formatting:
    
    ${text}
    
    Please organize the content with proper markdown syntax, including:
    - Headers (#, ##, ###)
    - Lists (bulleted and numbered)
    - Bold/italic for emphasis
    - Code blocks where appropriate
    - Tables if the content includes tabular data`;

    const response = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 3000,
    });

    return response.choices[0].message?.content || "Failed to convert to markdown.";
  } catch (error) {
    console.error("Error converting PDF to markdown:", error);
    throw new Error("Failed to convert PDF to markdown");
  }
}
