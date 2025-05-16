import os
import json
from typing import List, Dict
from pydantic import BaseModel
from groq import Groq
from fastapi import HTTPException
import requests  # Add this import
from dotenv import load_dotenv  # Add this import

load_dotenv()  # Add environment loading

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
        Analyze transcribed text using Together AI
        """
        try:
            request_payload = {
                "model": MODEL_NAME,
                "messages": [
                    {
                        "role": "system",
                        "content": "Analyze this transcription and extract key points. Provide a concise summary."
                    },
                    {
                        "role": "user",
                        "content": transcription
                    }
                ],
                "temperature": 0.3,
                "max_tokens": 4096,
                "response_format": {"type": "json_object"}
            }

            response = requests.post(
                "https://api.together.xyz/v1/chat/completions",
                headers=get_together_headers(),
                json=request_payload
            )
            
            response.raise_for_status()
            
            # Log raw response for debugging
            print(f"[analyze_audio_content] Raw API Response Status: {response.status_code}")
            print(f"[analyze_audio_content] Raw Response Text: {response.text[:500]}")
            
            try:
                response_json = response.json()
            except json.JSONDecodeError as e:
                print(f"[analyze_audio_content] Failed to parse response as JSON: {e}")
                raise ValueError(f"Invalid API response format: {str(e)}")
            
            if "choices" not in response_json or not response_json["choices"]:
                print(f"[analyze_audio_content] Missing 'choices' in response: {response_json}")
                raise ValueError("Invalid API response format")
                
            content = response_json["choices"][0]["message"]["content"]
            print(f"[analyze_audio_content] Raw content: {content[:200]}")
            
            # Validate content is not empty or invalid
            if not content or content == "[1]":
                print(f"[analyze_audio_content] Invalid or empty content: {content}")
                raise ValueError("API returned invalid or empty content")
                
            # Clean content by removing markdown code block markers if present
            cleaned_content = content
            if content.startswith('```') and content.endswith('```'):
                lines = content.split('\n')
                if len(lines) > 2:
                    cleaned_content = '\n'.join(lines[1:-1])
                    if cleaned_content.startswith('json') or cleaned_content.startswith('JSON'):
                        cleaned_content = '\n'.join(lines[2:-1])
            
            try:
                print(f"[analyze_audio_content] Attempting to parse cleaned content: {cleaned_content[:200]}")
                parsed = json.loads(cleaned_content)
                print(f"[analyze_audio_content] Parsed content: {parsed}")
                
                # Ensure parsed content is a dictionary
                if not isinstance(parsed, dict):
                    print(f"[analyze_audio_content] Parsed content is not a dict: {type(parsed)}")
                    raise ValueError("API response content is not a valid JSON object")
                
                # Validate required fields in response
                if not parsed or parsed == []:
                    print(f"[analyze_audio_content] Empty or invalid response content: {parsed}")
                    raise ValueError("API returned empty or invalid response content")
                
                # Safely get key_points and summary with defaults and validation
                key_points = parsed.get("key_points", [])
                if not isinstance(key_points, list):
                    print(f"[analyze_audio_content] Invalid key_points format, using empty list")
                    key_points = []
                    
                summary = parsed.get("summary", "")
                if not isinstance(summary, str):
                    print(f"[analyze_audio_content] Invalid summary format, using empty string")
                    summary = ""
                
                # Validate we have at least some content
                if not key_points and not summary:
                    print(f"[analyze_audio_content] Empty key_points and summary in response")
                    raise ValueError("API response contains no valid content")
                
                return KeyPointsResult(
                    key_points=key_points,
                    summary=summary
                )
            except json.JSONDecodeError as e:
                raise ValueError(f"Failed to parse API response content: {str(e)}")
            
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail={
                    "error": "Audio analysis failed",
                    "message": str(e),
                    "type": "analysis_error"
                }
            )