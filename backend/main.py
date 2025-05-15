import logging
from datetime import datetime
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
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

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('api_requests.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://192.168.1.5:3000/"],  # Frontend default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request/Response logging middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = datetime.now()
    
    # Log request details
    request_body = await request.body()
    logger.info(
        f"Incoming request: {request.method} {request.url.path} | "
        f"Headers: {dict(request.headers)} | "
        f"Body: {request_body.decode() if request_body else None}"
    )
    
    response = await call_next(request)
    
    # Log response details
    process_time = (datetime.now() - start_time).total_seconds() * 1000
    response_body = b""
    if hasattr(response, 'body'):
        response_body = await response.body()
    
    logger.info(
        f"Outgoing response: Status {response.status_code} | "
        f"Time: {process_time:.2f}ms | "
        f"Body: {response_body.decode() if response_body else None}"
    )
    
    return response

class NotesInput(BaseModel):
    text: str = Field(..., description="The text content to process")

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
        if not notes_input.text:
            raise HTTPException(status_code=422, detail="No notes provided")
        result = organize_notes(notes_input.text)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Note organization failed",
                "message": str(e),
                "type": "server_error"
            }
        )

@app.post("/extract-key-points", response_model=KeyPoints)
async def extract_key_points(notes_input: NotesInput):
    """
    Extract key points and supporting details from study notes
    """
    try:
        if not notes_input.text:
            raise HTTPException(status_code=422, detail="No notes provided")
        result = generate_key_points(notes_input.text)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Note organization failed",
                "message": str(e),
                "type": "server_error"
            }
        )

@app.post("/generate-flashcards", response_model=List[FlashCard])
async def create_flash_cards(notes_input: NotesInput):
    """
    Generate flash cards from study notes
    """
    try:
        if not notes_input.text:
            raise HTTPException(status_code=422, detail="No notes provided")
        result = generate_flash_cards(notes_input.text)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Note organization failed",
                "message": str(e),
                "type": "server_error"
            }
        )



@app.post("/generate-study-plan", response_model=StudyPlan)
async def generate_study_plan_endpoint(schedule_data: str):
    """
    Generate optimized study plan based on schedule and tasks
    """
    try:
        if not notes_input.text:
            raise HTTPException(status_code=422, detail="No notes provided")
        result = generate_study_plan(schedule_data)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Note organization failed",
                "message": str(e),
                "type": "server_error"
            }
        )

@app.get("/")
async def root():
    return {"message": "Welcome to StudyBud API - Your AI Study Assistant"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)