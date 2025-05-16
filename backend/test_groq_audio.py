import os
from groq import Groq
from pydantic import BaseModel

class TestTranscriptionResult(BaseModel):
    text: str
    segments: list
    words: list

def test_groq_audio_transcription():
    """Test Groq audio transcription API with a sample audio file"""
    client = Groq(api_key="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")
    
    # Use a sample audio file (replace with your test file path)
    audio_file = "temp_recording.wav"
    if not os.path.exists(audio_file):
        raise FileNotFoundError(f"Test audio file not found at {audio_file}")
    
    try:
        with open(audio_file, "rb") as file:
            transcription = client.audio.transcriptions.create(
                file=file,
                model="whisper-large-v3-turbo",
                response_format="text",
                language="en",
                temperature=0.0
            )
            
            result = TestTranscriptionResult(
                text=transcription.text,
                segments=transcription.segments,
                words=transcription.words
            )
            
            print("Transcription successful!")
            print(f"Text: {result.text}")
            return result
            
    except Exception as e:
        print(f"Transcription failed: {str(e)}")
        raise

if __name__ == "__main__":
    test_groq_audio_transcription()