import os
import json
from typing import List, Dict
from pydantic import BaseModel
from groq import Groq
from fastapi import HTTPException

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
                    response_format="json",
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
        Analyze transcribed text to identify key concepts and important points
        """
        try:
            # This would be replaced with actual AI analysis logic
            # For now, we'll return a mock response
            return KeyPointsResult(
                key_points=[
                    "Main concept 1 from the audio",
                    "Important point 2",
                    "Key takeaway 3"
                ],
                summary="This is a generated summary of the key points from the audio content."
            )
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail={
                    "error": "Audio analysis failed",
                    "message": str(e),
                    "type": "analysis_error"
                }
            )