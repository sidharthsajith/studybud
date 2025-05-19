import Together from "together-ai"

// Initialize Together AI client
const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY || "",
})

export async function generateCompletion(prompt: string) {
  try {
    const completion = await together.chat.completions.create({
      model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
      messages: [{ role: "user", content: prompt }],
    })

    return completion.choices[0].message.content
  } catch (error) {
    console.error("Error generating completion:", error)
    return "Sorry, I encountered an error while processing your request."
  }
}

export async function generateStudyMaterials(notes: string, type: "quiz" | "flashcards" | "summary") {
  const prompts = {
    quiz: `Generate a 5-question quiz based on the following notes:\n\n${notes}\n\nFor each question, provide 4 options and indicate the correct answer.`,
    flashcards: `Create 5 flashcards based on the following notes:\n\n${notes}\n\nFor each flashcard, provide a front (term/question) and back (definition/answer).`,
    summary: `Summarize the key points from the following notes:\n\n${notes}\n\nProvide a concise summary highlighting the most important concepts.`,
  }

  return generateCompletion(prompts[type])
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
