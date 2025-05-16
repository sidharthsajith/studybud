import os
from typing import List, Dict
from pydantic import BaseModel
from groq import Groq
from fastapi import HTTPException
from .ai_services import generate_key_points
from dotenv import load_dotenv

load_dotenv()

# Add Together AI configuration at the top
TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")
MODEL_NAME = "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo"

# Add headers function
def get_together_headers():
    return {
        "Authorization": f"Bearer {TOGETHER_API_KEY}",
        "Content-Type": "application/json",
        "User-Agent": "StudyBud/1.0.0"
    }


class TranscriptionResult(BaseModel):
    text: str
    segments: List[Dict]
    words: List[Dict]

class KeyPointsResult(BaseModel):
    key_points: List[str]
    summary: str

class VoiceAIService:
    def __init__(self):
        self.client = Groq()
    
    def transcribe_audio(self, audio_file_path: str) -> TranscriptionResult:
        """
        Transcribe audio file and return structured result with timestamps
        """
        try:
            if not os.path.exists(audio_file_path):
                raise FileNotFoundError(f"Audio file not found at {audio_file_path}")
            
            with open(audio_file_path, "rb") as file:
                transcription = self.client.audio.transcriptions.create(
                    file=file,
                    model="whisper-large-v3-turbo",
                    response_format="verbose_json",
                    timestamp_granularities=["word", "segment"],
                    language="en",
                    temperature=0.0
                )
                return TranscriptionResult(
                    text=transcription.text,
                    segments=transcription.segments,
                    words=transcription.words
                )
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail={
                    "error": "Audio transcription failed",
                    "message": str(e),
                    "type": "transcription_error"
                }
            )
    
    def analyze_audio_content(self, transcription: str) -> KeyPointsResult:
        """
        Analyze transcribed text using Together AI pattern from generate_key_points
        """
        try:
            # Validate input
            if not transcription or not isinstance(transcription, str) or transcription.strip() == "":
                raise ValueError("Transcription text cannot be empty")

            # Generate key points
            key_points_data = generate_key_points(transcription)
            
            # Validate root response structure
            if not hasattr(key_points_data, 'key_points'):
                print(f"[analyze_audio_content] Invalid response structure: {key_points_data}")
                return KeyPointsResult(key_points=[], summary="")

            validated_points = []
            for kp in key_points_data.key_points:
                # Match actual API response fields
                if isinstance(kp, str):
                    validated_points.append({
                        'title': kp,
                        'description': kp
                    })
                elif isinstance(kp, dict) and 'title' in kp and 'description' in kp:
                    validated_points.append({
                        'title': str(kp['title']),
                        'description': str(kp['description'])
                    })

            # Handle empty results gracefully
            if not validated_points:
                return KeyPointsResult(key_points=[], summary="")

            # Create summary from first 3 descriptions
            summary_points = [kp['description'] for kp in validated_points[:3]]
            
            return KeyPointsResult(
                key_points=[kp['title'] for kp in validated_points],
                summary=". ".join(summary_points) + "." if summary_points else ""
            )
            
        except ValueError as e:
            print(f"[analyze_audio_content] Validation error: {str(e)}")
            raise HTTPException(
                status_code=422,
                detail={
                    "error": "Invalid input",
                    "message": str(e),
                    "type": "validation_error"
                }
            )
        except Exception as e:
            print(f"[analyze_audio_content] Unexpected error: {str(e)}")
            raise HTTPException(
                status_code=500,
                detail={
                    "error": "Audio analysis failed",
                    "message": str(e),
                    "type": "analysis_error"
                }
            )