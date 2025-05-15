from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List, Dict
from studybud_backend.ai_services import (
    generate_key_points,
    generate_flash_cards,
    organize_notes,
    generate_study_plan,
    NoteCategory,
    NotesOrganization,
    KeyPoints,
    FlashCard,
    StudyPlan
)

app = FastAPI(
    title="StudyBud API",
    description="AI-powered study assistant API for organizing notes, generating flashcards, and creating quizzes",
    version="1.0.0"
)

class NotesInput(BaseModel):
    notes_corpus: str

class QuizResponse(BaseModel):
    knowledge_gaps: List[str]
    answer_improvements: Dict[str, str]
    study_recommendations: List[str]
    overall_score: float

class StudyPlan(BaseModel):
    schedule: Dict[str, List[str]] = Field(description="Daily schedule with time slots and tasks")
    priority_topics: List[str] = Field(description="List of topics to prioritize")
    estimated_time: Dict[str, float] = Field(description="Estimated time required for each topic")
    resources: Dict[str, List[str]] = Field(description="Recommended resources for each topic")

@app.post("/organize-notes", response_model=NotesOrganization)
async def organize_notes_endpoint(notes_input: NotesInput):
    """
    Organize and categorize study notes by topic and concept
    """
    try:
        result = organize_notes(notes_input.notes_corpus)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/extract-key-points", response_model=KeyPoints)
async def extract_key_points(notes_input: NotesInput):
    """
    Extract key points and supporting details from study notes
    """
    try:
        result = generate_key_points(notes_input.notes_corpus)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/generate-flash-cards", response_model=List[FlashCard])
async def create_flash_cards(notes_input: NotesInput):
    """
    Generate flash cards from study notes
    """
    try:
        result = generate_flash_cards(notes_input.notes_corpus)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")



@app.post("/generate-study-plan", response_model=StudyPlan)
async def generate_study_plan_endpoint(schedule_data: str):
    """
    Generate optimized study plan based on schedule and tasks
    """
    try:
        result = generate_study_plan(schedule_data)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/")
async def root():
    return {"message": "Welcome to StudyBud API - Your AI Study Assistant"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)