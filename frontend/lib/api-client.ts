// Function to get the API base URL
async function getApiBaseUrl() {
  // Try to get from environment variable first
  if (typeof window !== "undefined" && window.__API_BASE_URL) {
    return window.__API_BASE_URL
  }

  try {
    const response = await fetch("/api/config")
    const config = await response.json()

    if (typeof window !== "undefined") {
      // Cache the base URL
      window.__API_BASE_URL = config.apiBaseUrl
    }

    return config.apiBaseUrl
  } catch (error) {
    console.error("Failed to fetch API config:", error)
    return "https://api.studybud.example.com" // Fallback
  }
}

// Add this to the global Window interface
declare global {
  interface Window {
    __API_BASE_URL?: string
  }
}

/**
 * Organize and categorize study notes by topic and concept
 */
export async function organizeNotes(text: string) {
  console.log('[organizeNotes] Starting to organize notes...')
  console.log('[organizeNotes] Input corpus length:', text.length)

  const baseUrl = await getApiBaseUrl()
  console.log('[organizeNotes] Using API base URL:', baseUrl)

  const requestBody = JSON.stringify({ text: text })
  console.log('[organizeNotes] Request payload:', requestBody)

  const response = await fetch(`${baseUrl}organize-notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: requestBody,
  })
  console.log('[organizeNotes] Response status:', response.status)
  console.log('[organizeNotes] Response headers:', Object.fromEntries(response.headers.entries()))

  // Check content type before attempting to parse JSON
  const contentType = response.headers.get("content-type")
  console.log('[organizeNotes] Content-Type:', contentType)

  if (!contentType?.includes("application/json")) {
    // If we got HTML instead of JSON, provide a more helpful error message
    const text = await response.text()
    console.error('[organizeNotes] Received non-JSON response:', text)
    if (text.includes("<!DOCTYPE") || text.includes("<html")) {
      throw new Error(`Server returned HTML instead of JSON. The API endpoint might be unavailable or returning an error page.`)
    } else {
      throw new Error(`Invalid response type: ${contentType}. Expected JSON.`)
    }
  }

  if (!response.ok) {
    console.error('[organizeNotes] API error:', response.status)
    throw new Error(`API error: ${response.status}`)
  }

  const jsonResponse = await response.json()
  console.log('[organizeNotes] Successfully parsed JSON response:', jsonResponse)
  return jsonResponse
}

/**
 * Extract key points and summarize the main ideas from a text.
 */
export async function extractKeyPoints(text: string) {
  const baseUrl = await getApiBaseUrl()
  const response = await fetch(`${baseUrl}extract-key-points`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: text }),
  })

  // Check content type before attempting to parse JSON
  const contentType = response.headers.get("content-type")
  console.log('[organizeNotes] Content-Type:', contentType)

  if (!contentType?.includes("application/json")) {
    // If we got HTML instead of JSON, provide a more helpful error message
    const text = await response.text()
    console.error('[organizeNotes] Received non-JSON response:', text)
    if (text.includes("<!DOCTYPE") || text.includes("<html")) {
      throw new Error(`Server returned HTML instead of JSON. The API endpoint might be unavailable or returning an error page.`)
    } else {
      throw new Error(`Invalid response type: ${contentType}. Expected JSON.`)
    }
  }

  if (!response.ok) {
    console.error('[organizeNotes] API error:', response.status)
    throw new Error(`API error: ${response.status}`)
  }

  const jsonResponse = await response.json()
  console.log('[organizeNotes] Successfully parsed JSON response:', jsonResponse)
  return jsonResponse
}

/**
 * Generate flashcards from a given text for memorization and review.
 */
export async function generateFlashCards(text: string) {
  const baseUrl = await getApiBaseUrl()
  const response = await fetch(`${baseUrl}generate-flashcards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: text }),
  })

  // Check content type before attempting to parse JSON
  const contentType = response.headers.get("content-type")
  console.log('[organizeNotes] Content-Type:', contentType)

  if (!contentType?.includes("application/json")) {
    // If we got HTML instead of JSON, provide a more helpful error message
    const text = await response.text()
    console.error('[organizeNotes] Received non-JSON response:', text)
    if (text.includes("<!DOCTYPE") || text.includes("<html")) {
      throw new Error(`Server returned HTML instead of JSON. The API endpoint might be unavailable or returning an error page.`)
    } else {
      throw new Error(`Invalid response type: ${contentType}. Expected JSON.`)
    }
  }

  if (!response.ok) {
    console.error('[organizeNotes] API error:', response.status)
    throw new Error(`API error: ${response.status}`)
  }

  const jsonResponse = await response.json()
  console.log('[organizeNotes] Successfully parsed JSON response:', jsonResponse)
  return jsonResponse
}

/**
 * Create a structured study plan with timelines and goals.
 */
export async function generateStudyPlan(topic: string) {
  const baseUrl = await getApiBaseUrl()
  const response = await fetch(`${baseUrl}generate-study-plan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ topic: topic }),
  })

  // Check content type before attempting to parse JSON
  const contentType = response.headers.get("content-type")
  console.log('[organizeNotes] Content-Type:', contentType)

  if (!contentType?.includes("application/json")) {
    // If we got HTML instead of JSON, provide a more helpful error message
    const text = await response.text()
    console.error('[organizeNotes] Received non-JSON response:', text)
    if (text.includes("<!DOCTYPE") || text.includes("<html")) {
      throw new Error(`Server returned HTML instead of JSON. The API endpoint might be unavailable or returning an error page.`)
    } else {
      throw new Error(`Invalid response type: ${contentType}. Expected JSON.`)
    }
  }

  if (!response.ok) {
    console.error('[organizeNotes] API error:', response.status)
    throw new Error(`API error: ${response.status}`)
  }

  const jsonResponse = await response.json()
  console.log('[organizeNotes] Successfully parsed JSON response:', jsonResponse)
  return jsonResponse
}
