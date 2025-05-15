// Organize Notes Response Types
export interface Category {
  [key: string]: any
}

export interface ConceptMap {
  [key: string]: string[]
}

export interface OrganizeNotesResponse {
  categories: Category[]
  concept_map: ConceptMap
}

// Extract Key Points Response Types
export interface KeyPoint {
  [key: string]: any
}

export interface SupportingDetails {
  [key: string]: string[]
}

export interface KeyPointsResponse {
  key_points: KeyPoint[]
  supporting_details: SupportingDetails
}

// Flash Card Types
export interface FlashCard {
  question: string
  answer: string
  difficulty: number
}

// Study Plan Response Types
export interface Schedule {
  [key: string]: string[]
}

export interface EstimatedTime {
  [key: string]: number
}

export interface Resources {
  [key: string]: string[]
}

export interface StudyPlanResponse {
  schedule: Schedule
  priority_topics: string[]
  estimated_time: EstimatedTime
  resources: Resources
}
