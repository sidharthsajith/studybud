// API Service Utilities

type ApiResponse<T> = {
  data?: T
  error?: string
}

const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
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
      const response = await fetch('/organize-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes_corpus: notesCorpus })
      })
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
      const response = await fetch('/extract-key-points', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes_corpus: notesCorpus })
      })
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
      const response = await fetch('/generate-flash-cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes_corpus: notesCorpus })
      })
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
      const response = await fetch(`/generate-study-plan?schedule_data=${encodeURIComponent(scheduleData)}`, {
        method: 'POST'
      })
      return handleResponse(response)
    } catch (error) {
      return { error: 'Failed to generate study plan' }
    }
  }
}