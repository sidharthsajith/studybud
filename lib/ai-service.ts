import Together from "together-ai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

// Initialize Together AI client
const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY || "",
});

export async function generateCompletion(prompt: string) {
  try {
    const completion = await together.chat.completions.create({
      model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
      messages: [{ role: "user", content: prompt }],
    })

    const content = completion.choices?.[0]?.message?.content
    return content ?? ""
  } catch (error) {
    console.error("Error generating completion:", error)
    return "Sorry, I encountered an error while processing your request."
  }
}

export async function generateFlashcards(notes: string) {
  // Zod schema for structured output
  const flashcardSchema = z.object({
    flashcards: z.array(
      z.object({
        front: z.string().describe("Question or term"),
        back: z.string().describe("Answer or definition"),
      }),
    ),
  })
  const jsonSchema = zodToJsonSchema(flashcardSchema, { target: "openAi" })

  const completion = await together.chat.completions.create({
    model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
    messages: [
      {
        role: "system",
        content: "You are an assistant that only responds with valid JSON that conforms to the given schema.",
      },
      {
        role: "user",
        content: `Generate flashcards from the following study notes:`,
      },
      { role: "user", content: notes },
    ],
    response_format: { type: "json_object", schema: jsonSchema },
  })

  try {
    const raw = completion.choices?.[0]?.message?.content ?? ""
    const parsed = JSON.parse(raw)
    return parsed.flashcards ?? []
  } catch (err) {
    console.error("Error parsing structured flashcards response", err)
    return []
  }
}

export async function generateQuiz(notes: string) {
  // Zod schema for structured output
  const quizSchema = z.object({
    quiz: z.array(
      z.object({
        question: z.string(),
        options: z.array(z.string()).length(4),
        correctAnswer: z.string(),
      }),
    ),
  })
  const jsonSchema = zodToJsonSchema(quizSchema, { target: "openAi" })

  const completion = await together.chat.completions.create({
    model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
    messages: [
      {
        role: "system",
        content: "You are an assistant that only responds with valid JSON that conforms to the given schema.",
      },
      {
        role: "user",
        content: `Generate a multiple choice quiz from the following study notes:`,
      },
      { role: "user", content: notes },
    ],
    response_format: { type: "json_object", schema: jsonSchema },
  })

  try {
    const raw = completion.choices?.[0]?.message?.content ?? ""
    const parsed = JSON.parse(raw)
    return parsed.quiz ?? []
  } catch (err) {
    console.error("Error parsing structured quiz response", err)
    return []
  }
}

export async function analyzeWriting(text: string) {
  const prompt = `Analyze the following text and provide suggestions for improvement in terms of clarity, structure, and content:\n\n${text}`
  return generateCompletion(prompt)
}

export async function identifyKnowledgeGaps(notes: string, quizResults: string) {
  const prompt = `Based on the following study notes and quiz results, identify potential knowledge gaps and suggest focused study areas:\n\nNotes:\n${notes}\n\nQuiz Results:\n${quizResults}`
  return generateCompletion(prompt)
}

export async function generateResearchQuestions(topic: string) {
  const prompt = `Generate 5 potential research questions related to the following topic:\n\n${topic}`
  return generateCompletion(prompt)
}

export async function analyzeLanguage(text: string, language: string) {
  const prompt = `Analyze the following text in ${language}. Provide feedback on grammar, vocabulary, and fluency. Also provide a translation to English, identify any errors, and suggest improvements.

Text: ${text}

Please format your response as a JSON object with the following structure:
{
  "translation": "English translation of the text",
  "grammar_issues": [
    {"error": "Description of grammar error", "correction": "Suggested correction"}
  ],
  "vocabulary_level": "Beginner/Intermediate/Advanced",
  "fluency_score": "Score from 1-10",
  "vocabulary": ["List", "of", "notable", "vocabulary", "words", "used"],
  "suggestions": ["Suggestion 1", "Suggestion 2"]
}
`

  const response = await generateCompletion(prompt)

  try {
    // Try to parse the response as JSON
    return JSON.parse(response)
  } catch (error) {
    // If parsing fails, return a structured object with the raw response
    console.error("Error parsing language analysis response:", error)
    return {
      translation: "Translation could not be generated",
      grammar_issues: [],
      vocabulary_level: "Unknown",
      fluency_score: 0,
      vocabulary: [],
      suggestions: ["Try again with a different text"],
      raw_response: response,
    }
  }
}
