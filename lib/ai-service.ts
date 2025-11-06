import OpenAI from 'openai';
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

// Initialize OpenAI client configured for OpenRouter
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || "",
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    'X-Title': 'StudyBud',
  },
  defaultQuery: { 'api-version': '2023-05-15' },
});

// Default model to use
const DEFAULT_MODEL = 'meta-llama/llama-3-8b-instruct';

export async function generateCompletion(prompt: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [{ role: "user", content: prompt }],
    });

    return completion.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Error generating completion:", error);
    return "Sorry, I encountered an error while processing your request.";
  }
}

function extractJson(str: string): any {
  try {
    // If already valid JSON
    return JSON.parse(str);
  } catch (_) {
    // Try to find first '{' and last '}'
    const first = str.indexOf('{');
    const last = str.lastIndexOf('}');
    if (first !== -1 && last !== -1) {
      const slice = str.slice(first, last + 1);
      try {
        return JSON.parse(slice);
      } catch (err) {
        console.warn('Failed to parse extracted JSON slice', err);
      }
    }
    return null;
  }
}


export async function generateQuiz(notes: string) {
  // Zod schema for structured output
  const quizSchema = z.object({
    questions: z.array(
      z.object({
        question: z.string(),
        options: z.array(z.string()),
        correctAnswer: z.number().int().min(0),
      })
    ),
  });

  try {
    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful quiz generator. Create multiple-choice questions based on the provided notes. Each question should have 4 options and one correct answer. Return only valid JSON.",
        },
        {
          role: "user",
          content: `Generate quiz questions from these notes: ${notes}`,
        },
      ],
      // Note: Removed schema validation as it's not directly supported in this format with OpenRouter
      // Consider implementing client-side validation instead
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("No content in response");

    const parsed = extractJson(content);
    return parsed?.questions || [];
  } catch (error) {
    console.error("Error generating quiz:", error);
    return [];
  }
}

export async function analyzeWriting(text: string) {
  return generateCompletion(
    `Please analyze this writing and provide feedback on grammar, clarity, and structure:\n\n${text}`
  );
}

export async function generateStudyMaterials(content: string, type: string) {
  try {
    const prompt = `Create comprehensive study materials for the following ${type} content. 
      Include key concepts, definitions, examples, and any relevant diagrams or visual aids:
      
      ${content}
      
      Format your response in markdown with appropriate headings.`;
      
    return await generateCompletion(prompt);
  } catch (error) {
    console.error("Error generating study materials:", error);
    return "Sorry, I encountered an error while generating study materials.";
  }
}

export async function identifyKnowledgeGaps(notes: string, quizResults: string) {
  return generateCompletion(
    `Based on these notes and quiz results, identify knowledge gaps and suggest areas for improvement:\n\nNotes: ${notes}\n\nQuiz Results: ${quizResults}`
  );
}

export async function generateResearchQuestions(topic: string) {
  return generateCompletion(
    `Generate 5 research questions about: ${topic}`
  );
}

export async function analyzeLanguage(text: string, language: string) {
  const prompt = `Analyze the following ${language} text and provide feedback:\n\n${text}\n\n` +
    `Please format your response as a JSON object with the following structure:\n{\n  \"translation\": \"English translation of the text\",\n  \"grammar_issues\": [\n    {\"error\": \"Description of grammar error\", \"correction\": \"Suggested correction\"}\n  ],\n  \"vocabulary_level\": \"Beginner/Intermediate/Advanced\",\n  \"fluency_score\": 0,\n  \"vocabulary\": [\"List\", \"of\", \"notable\", \"vocabulary\", \"words\", \"used\"],\n  \"suggestions\": [\"Suggestion 1\", \"Suggestion 2\"]\n}`;

  try {
    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        {
          role: "system",
          content: `You are a helpful language learning assistant. Analyze the following text in ${language} and provide feedback on grammar, vocabulary, and naturalness.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("No content in response");

    // Try to parse the response as JSON
    const result = JSON.parse(content);
    
    // Ensure the response has all required fields
    return {
      translation: result.translation || "",
      grammar_issues: result.grammar_issues || [],
      vocabulary_level: result.vocabulary_level || "Unknown",
      fluency_score: result.fluency_score || 0,
      vocabulary: result.vocabulary || [],
      suggestions: result.suggestions || [],
    };
  } catch (error) {
    console.error("Error analyzing language:", error);
    return {
      translation: "",
      grammar_issues: [],
      vocabulary_level: "Unknown",
      fluency_score: 0,
      vocabulary: [],
      suggestions: ["An error occurred while analyzing the text. Please try again."],
    };
  }
}
