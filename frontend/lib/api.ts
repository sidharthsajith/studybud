// API Service Utilities

type ApiResponse<T> = {
  data?: T
  error?: string
}

const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  // Check content type before attempting to parse JSON
  const contentType = response.headers.get("content-type")
  if (!contentType?.includes("application/json")) {
    // If we got HTML instead of JSON, provide a more helpful error message
    const text = await response.text()
    if (text.includes("<!DOCTYPE") || text.includes("<html")) {
      return { error: `Server returned HTML instead of JSON. The API endpoint might be unavailable or returning an error page.` }
    } else {
      return { error: `Invalid response type: ${contentType}. Expected JSON.` }
    }
  }

  if (!response.ok) {
    return { error: `HTTP error! status: ${response.status}` }
  }
  return { data: await response.json() }
}

// API Endpoints
export const api = {
  organizeNotes: async (notesCorpus: string): Promise<ApiResponse<{
    categories: Record<string, unknown>[]
    concept_map: Record<string, string[]>
  }>> => {
    try {
      const response = await organizeNotes(notesCorpus)
      return handleResponse(response)
    } catch (error) {
      return { error: 'Failed to organize notes' }
    }
  },

  extractKeyPoints: async (notesCorpus: string): Promise<ApiResponse<{
    key_points: Record<string, unknown>[]
    supporting_details: Record<string, string[]>
  }>> => {
    try {
      const response = await extractKeyPoints(notesCorpus)
      return handleResponse(response)
    } catch (error) {
      return { error: 'Failed to extract key points' }
    }
  },

  generateFlashCards: async (notesCorpus: string): Promise<ApiResponse<Array<{
    question: string
    answer: string
    difficulty: number
  }>>> => {
    try {
      const response = await generateFlashCards(notesCorpus)
      return handleResponse(response)
    } catch (error) {
      return { error: 'Failed to generate flashcards' }
    }
  },

  generateStudyPlan: async (scheduleData: string): Promise<ApiResponse<{
    schedule: Record<string, string[]>
    priority_topics: string[]
    estimated_time: Record<string, number>
    resources: Record<string, string[]>
  }>> => {
    try {
      const response = await generateStudyPlan(scheduleData)
      return handleResponse(response)
    } catch (error) {
      return { error: 'Failed to generate study plan' }
    }
  }
}