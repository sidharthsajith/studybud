import Together from "together-ai"

// Initialize Together AI client - this will only run on the server
const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY || "",
})

export async function analyzeImage(imageUrl: string, prompt = "") {
  try {
    const defaultPrompt = "Analyze this image and describe what you see in detail."
    const userPrompt = prompt || defaultPrompt

    const response = await together.chat.completions.create({
      model: "llama-3.2-11b-vision-instruct",
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
    })

    return response.choices[0].message.content
  } catch (error) {
    console.error("Error analyzing image:", error)
    throw new Error("Failed to analyze image")
  }
}

export async function extractTextFromImage(imageUrl: string) {
  try {
    const response = await together.chat.completions.create({
      model: "llama-3.2-11b-vision-instruct",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Extract all text from this image. Output only the text content." },
            {
              type: "image_url",
              image_url: imageUrl,
            },
          ],
        },
      ],
      max_tokens: 1024,
    })

    return response.choices[0].message.content
  } catch (error) {
    console.error("Error extracting text from image:", error)
    throw new Error("Failed to extract text from image")
  }
}

export async function analyzeStudyMaterial(imageUrl: string) {
  try {
    const response = await together.chat.completions.create({
      model: "llama-3.2-11b-vision-instruct",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "This is a study material. Analyze it and provide the following: 1) Main topic and subject area, 2) Key concepts covered, 3) Suggested study questions based on this material, 4) Any formulas or important definitions present, 5) Recommendations for further study.",
            },
            {
              type: "image_url",
              image_url: imageUrl,
            },
          ],
        },
      ],
      max_tokens: 1500,
    })

    return response.choices[0].message.content
  } catch (error) {
    console.error("Error analyzing study material:", error)
    throw new Error("Failed to analyze study material")
  }
}

export async function solveProblemsFromImage(imageUrl: string) {
  try {
    const response = await together.chat.completions.create({
      model: "llama-3.2-11b-vision-instruct",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "This image contains one or more problems or questions. Please solve each problem step by step, showing your work and explaining the reasoning behind each step. If there are multiple problems, address each one separately.",
            },
            {
              type: "image_url",
              image_url: imageUrl,
            },
          ],
        },
      ],
      max_tokens: 2000,
    })

    return response.choices[0].message.content
  } catch (error) {
    console.error("Error solving problems from image:", error)
    throw new Error("Failed to solve problems from image")
  }
}
