import { AssignmentHelperResponse, EnhancerAssignmentResponse } from '../types/assignment'

// Function to get the API base URL
async function getApiBaseUrl() {
  // Try to get from environment variable first
  if (typeof window !== 'undefined' && window.__API_BASE_URL) {
    return window.__API_BASE_URL
  }

  try {
    const response = await fetch('/api/config')
    const config = await response.json()

    if (typeof window !== 'undefined') {
      // Cache the base URL
      window.__API_BASE_URL = config.apiBaseUrl
    }

    return config.apiBaseUrl
  } catch (error) {
    console.error('Failed to fetch API config:', error)
    return 'https://api.studybud.example.com' // Fallback
  }
}

/**
 * Generate structured assignment guidance based on provided text content
 */
export async function getAssignmentHelp(text: string): Promise<AssignmentHelperResponse> {
  console.log('[getAssignmentHelp] Starting to generate assignment help...')
  console.log('[getAssignmentHelp] Input text length:', text.length)

  const baseUrl = await getApiBaseUrl()
  console.log('[getAssignmentHelp] Using API base URL:', baseUrl)

  const requestBody = JSON.stringify({ text })
  console.log('[getAssignmentHelp] Request payload:', requestBody)

  const response = await fetch(`${baseUrl}assignment-help`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: requestBody,
  })

  // Add detailed error logging
  const responseClone = response.clone()
  try {
    if (!response.ok) {
      const errorText = await responseClone.text()
      console.error('[getAssignmentHelp] Error response:', errorText)
      throw new Error(`API error: ${response.status}`)
    }

    const contentType = response.headers.get('content-type')
    if (!contentType?.includes('application/json')) {
      const text = await response.text()
      console.error('[getAssignmentHelp] Received non-JSON response:', text)
      throw new Error(`Invalid response type: ${contentType}. Expected JSON.`)
    }

    const jsonResponse = await response.json()
    console.log('[getAssignmentHelp] Successfully parsed JSON response:', jsonResponse)
    return jsonResponse
  } catch (error) {
    console.error('[getAssignmentHelp] Error processing response:', error)
    throw error
  }
}

/**
 * Enhance an existing assignment with comprehensive feedback
 */
export async function enhanceAssignment(text: string): Promise<EnhancerAssignmentResponse> {
  console.log('[enhanceAssignment] Starting to enhance assignment...')
  console.log('[enhanceAssignment] Input text length:', text.length)

  const baseUrl = await getApiBaseUrl()
  console.log('[enhanceAssignment] Using API base URL:', baseUrl)

  const requestBody = JSON.stringify({ text })
  console.log('[enhanceAssignment] Request payload:', requestBody)

  const response = await fetch(`${baseUrl}enhance-assignment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: requestBody,
  })

  // Add detailed error logging
  const responseClone = response.clone()
  try {
    if (!response.ok) {
      const errorText = await responseClone.text()
      console.error('[enhanceAssignment] Error response:', errorText)
      throw new Error(`API error: ${response.status}`)
    }

    const contentType = response.headers.get('content-type')
    if (!contentType?.includes('application/json')) {
      const text = await response.text()
      console.error('[enhanceAssignment] Received non-JSON response:', text)
      throw new Error(`Invalid response type: ${contentType}. Expected JSON.`)
    }

    const jsonResponse = await response.json()
    console.log('[enhanceAssignment] Successfully parsed JSON response:', jsonResponse)
    return jsonResponse
  } catch (error) {
    console.error('[enhanceAssignment] Error processing response:', error)
    throw error
  }
}