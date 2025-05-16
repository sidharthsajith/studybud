import logging
from datetime import datetime
from fastapi import FastAPI, HTTPException, Request, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import List, Dict
from studybud_backend.ai_services import (
    generate_key_points,
    generate_flash_cards,
    generate_study_plan,
    KeyPoints,
    FlashCard,
)
from studybud_backend.voice_ai import VoiceAIService, TranscriptionResult, KeyPointsResult

app = FastAPI(
    title="StudyBud API",
    description="AI-powered study assistant API for organizing notes, generating flashcards, and creating quizzes",
    version="1.0.0",
    max_request_size=10 * 1024 * 1024  # 10MB payload limit
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://192.168.1.5:3000"],  # Frontend origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)



class NotesInput(BaseModel):
    text: str = Field(..., description="The text content to process")

class StudyPlanInput(BaseModel):
    topic: str = Field(..., description="The study topic to plan for")

class QuizResponse(BaseModel):
    knowledge_gaps: List[str]
    answer_improvements: Dict[str, str]
    study_recommendations: List[str]
    overall_score: float





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
                "error": "Study plan generation failed",
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
                "error": "Study plan generation failed",
                "message": str(e),
                "type": "server_error"
            }
        )

@app.get("/")
async def root():
    return {"message": "Welcome to StudyBud API - Your AI Study Assistant"}

voice_ai_service = VoiceAIService()

@app.post("/transcribe-audio", response_model=TranscriptionResult)
async def transcribe_audio(file: UploadFile = File(...)):
    """
    Upload and transcribe an audio file
    """
    try:
        # Save the uploaded file temporarily
        temp_path = f"temp_{file.filename}"
        with open(temp_path, "wb") as f:
            f.write(await file.read())
        
        # Transcribe the audio
        result = voice_ai_service.transcribe_audio(temp_path)
        
        # Clean up the temp file
        os.remove(temp_path)
        
        return result
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Audio processing failed",
                "message": str(e),
                "type": "audio_processing_error"
            }
        )

@app.post("/analyze-audio", response_model=KeyPointsResult)
async def analyze_audio(transcription: str):
    """
    Analyze transcribed audio content to extract key points
    """
    try:
        return voice_ai_service.analyze_audio_content(transcription)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Audio analysis failed",
                "message": str(e),
                "type": "analysis_error"
            }
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)