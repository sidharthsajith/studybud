import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { imageUrl, action, prompt } = await request.json()

    if (!imageUrl) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 })
    }

    let result = ""

    // Handle different types of analysis
    switch (action) {
      case "extract-text":
        result = await extractTextFromImage(imageUrl)
        break
      case "analyze-study-material":
        result = await analyzeStudyMaterial(imageUrl)
        break
      case "solve-problems":
        result = await solveProblemsFromImage(imageUrl)
        break
      case "analyze":
      default:
        result = await analyzeImage(imageUrl, prompt)
        break
    }

    return NextResponse.json({ result })
  } catch (error: any) {
    console.error("Error in image analysis:", error)
    return NextResponse.json({ error: error.message || "Failed to analyze image" }, { status: 500 })
  }
}

async function analyzeImage(imageUrl: string, prompt = "") {
  try {
    const defaultPrompt = "Analyze this image and describe what you see in detail."
    const userPrompt = prompt || defaultPrompt

    // Direct API call to Together AI with the correct model name
    const response = await fetch("https://api.together.xyz/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: userPrompt },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl,
                },
              },
            ],
          },
        ],
        max_tokens: 1024,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Together API error:", errorData)
      throw new Error(errorData.error?.message || "Failed to analyze image with AI")
    }

    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.error("Error analyzing image:", error)
    throw new Error(`Failed to analyze image: ${error instanceof Error ? error.message : String(error)}`)
  }
}

async function extractTextFromImage(imageUrl: string) {
  try {
    const response = await fetch("https://api.together.xyz/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "Extract all text from this image. Output only the text content." },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl,
                },
              },
            ],
          },
        ],
        max_tokens: 1024,
        temperature: 0.3,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || "Failed to extract text from image")
    }

    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.error("Error extracting text from image:", error)
    throw new Error(`Failed to extract text from image: ${error instanceof Error ? error.message : String(error)}`)
  }
}

async function analyzeStudyMaterial(imageUrl: string) {
  try {
    const response = await fetch("https://api.together.xyz/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
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
                image_url: {
                  url: imageUrl,
                },
              },
            ],
          },
        ],
        max_tokens: 1500,
        temperature: 0.5,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || "Failed to analyze study material")
    }

    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.error("Error analyzing study material:", error)
    throw new Error(`Failed to analyze study material: ${error instanceof Error ? error.message : String(error)}`)
  }
}

async function solveProblemsFromImage(imageUrl: string) {
  try {
    const response = await fetch("https://api.together.xyz/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
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
                image_url: {
                  url: imageUrl,
                },
              },
            ],
          },
        ],
        max_tokens: 2000,
        temperature: 0.4,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || "Failed to solve problems from image")
    }

    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.error("Error solving problems from image:", error)
    throw new Error(`Failed to solve problems from image: ${error instanceof Error ? error.message : String(error)}`)
  }
}
