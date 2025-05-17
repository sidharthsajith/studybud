import json
import os
import requests
from pydantic import BaseModel, Field
from typing import List, Dict
from dotenv import load_dotenv
load_dotenv()

# Initialize Together AI configuration
TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")
MODEL_NAME = "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo"

# Common headers for Together AI API requests
def get_together_headers():
    return {
        "Authorization": f"Bearer {TOGETHER_API_KEY}",
        "Content-Type": "application/json",
        "User-Agent": "StudyBud/1.0.0"
    }

# Define schema for note organization and other AI responses
class NoteCategory(BaseModel):
    topic: str = Field(description="Main topic of the note")
    concepts: List[str] = Field(description="Key concepts covered in the note")
    importance_score: int = Field(description="Importance score from 1-10")
    summary: str = Field(description="Brief summary of the note content")
    related_topics: List[str] = Field(description="Related topics that connect to this note")

class NotesOrganization(BaseModel):
    categories: List[Dict] = Field(description="List of categorized notes")
    concept_map: Dict[str, List[str]] = Field(description="Mapping of concepts to related notes")

class KeyPoints(BaseModel):
    key_points: List[Dict] = Field(description="List of key points with point, details and supporting text")
    supporting_details: Dict[str, List[str]] = Field(description="Supporting details for each key point")

class FlashCard(BaseModel):
    question: str = Field(description="Question for the flashcard")
    answer: str = Field(description="Answer for the flashcard")
    difficulty: int = Field(description="Difficulty level from 1-5")

# The QuizQuestion model now properly matches API response structure


def generate_key_points(notes_corpus: str) -> Dict:
    """
    Extracts key points from notes using Together AI
    
    Args:
        notes_corpus (str): Raw text containing all notes
        
    Returns:
        Dict: Structured JSON containing key points and supporting details
    """
    try:
        request_payload = {
            "model": MODEL_NAME,
            "messages": [
                {
                    "role": "system",
                    "content": "You are a key point extraction assistant. Analyze the provided notes and extract the most important key points with supporting details. Only respond in JSON format."
                },
                {
                    "role": "user",
                    "content": f"Please extract key points from these notes:\n{notes_corpus}"
                }
            ],
            "response_format": {
                "type": "json_object",
                "schema": KeyPoints.model_json_schema()
            }
        }
        print(f"[generate_key_points] Request Payload: {json.dumps(request_payload, indent=2)}")

        response = requests.post(
            "https://api.together.xyz/v1/chat/completions",
            headers=get_together_headers(),
            json=request_payload
        )
        print(f"[generate_key_points] Raw API Response Status Code: {response.status_code}")
        print(f"[generate_key_points] Raw API Response Text: {response.text}")
        
        response.raise_for_status()
        
        try:
            response_json = response.json()
        except json.JSONDecodeError as e:
            print(f"Failed to parse API response as JSON: {response.text}")
            raise ValueError(f"Invalid JSON in API response: {str(e)}")
            
        if not isinstance(response_json, dict):
            print(f"Unexpected API response format: {response_json}")
            raise ValueError("API response is not a valid JSON object")
            
        if "choices" not in response_json:
            print(f"Missing 'choices' in response: {response_json}")
            raise ValueError("Invalid API response format: missing 'choices' field")
            
        choices = response_json["choices"]
        if not isinstance(choices, list) or not choices:
            print(f"Invalid 'choices' format: {choices}")
            raise ValueError("Invalid API response format: 'choices' field is not a valid array")
            
        first_choice = choices[0]
        if not isinstance(first_choice, dict):
            print(f"Invalid choice format: {first_choice}")
            raise ValueError("Invalid API response format: choice is not a valid object")
            
        message = first_choice.get("message")
        if not message or not isinstance(message, dict):
            print(f"Invalid message format: {message}")
            raise ValueError("Invalid API response format: missing or invalid 'message' field")
            
        content = message.get("content")
        if not content:
            print("Empty content in API response")
            raise ValueError("Invalid API response format: empty content field")
            
        if not isinstance(content, str):
            print(f"Invalid content format: {content}")
            raise ValueError("Invalid API response format: content is not a string")
            
        try:
            # Clean content by removing markdown code block markers if present
            cleaned_content = content
            if content.startswith('```') and content.endswith('```'):
                # Extract content between markdown markers
                lines = content.split('\n')
                if len(lines) > 2:  # At least 3 lines (opening marker, content, closing marker)
                    # Skip first line (opening marker) and last line (closing marker)
                    cleaned_content = '\n'.join(lines[1:-1])
                    # If first line contains language identifier (e.g., ```json), skip it
                    if cleaned_content.startswith('json') or cleaned_content.startswith('JSON'):
                        cleaned_content = '\n'.join(lines[2:-1])
            
            print(f"[generate_key_points] Attempting to parse cleaned content: {cleaned_content}")
            parsed_content = json.loads(cleaned_content)
            print(f"[generate_key_points] Parsed Content: {parsed_content}")
            
            if not isinstance(parsed_content, dict):
                print(f"Invalid parsed content format: {parsed_content}")
                raise ValueError("API response content is not a valid JSON object")
                
            # Validate required fields in response
            required_fields = ['key_points', 'supporting_details']
            for field in required_fields:
                if field not in parsed_content:
                    print(f"Warning: Missing required field '{field}' in response, providing default value")
                    if field == 'key_points':
                        parsed_content[field] = []
                    elif field == 'supporting_details':
                        parsed_content[field] = {}
            
            return KeyPoints(**parsed_content)
            
        except json.JSONDecodeError as e:
            print(f"JSON parsing error at position {e.pos}, line {e.lineno}, column {e.colno}")
            print(f"Content causing error: {cleaned_content}")
            raise ValueError(f"Failed to parse API response content: {str(e)}")
            
    except requests.exceptions.RequestException as e:
        print(f"[generate_key_points] API request failed: {str(e)}")
        raise ValueError(f"API request failed: {str(e)}")
    except Exception as e:
        print(f"[generate_key_points] Unexpected error: {str(e)}")
        raise ValueError(f"Unexpected error while processing API response: {str(e)}")

def generate_flash_cards(notes_corpus: str) -> List[Dict]:
    """
    Generates flash cards from notes using Together AI
    
    Args:
        notes_corpus (str): Raw text containing all notes
        
    Returns:
        List[Dict]: List of flash cards in JSON format
    """
    try:
        response = requests.post(
            "https://api.together.xyz/v1/chat/completions",
            headers=get_together_headers(),
            json={
                "model": MODEL_NAME,
                "messages": [
                    {
                        "role": "system",
                        "content": "You are a flash card generator. Create question-answer pairs from the provided notes. Only respond in JSON format."
                    },
                    {
                        "role": "user",
                        "content": f"Please generate flash cards from these notes:\n{notes_corpus}"
                    }
                ],
                "response_format": {
                    "type": "json_schema",
                    "json_schema": {
                        "name": "flash_cards",
                        "strict": True,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "quiz": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": FlashCard.model_json_schema()["properties"]
                                    }
                                }
                            },
                            "required": ["quiz"]
                        }
                    }
                }
            }
        )
        print(f"[generate_flash_cards] Raw API Response Status Code: {response.status_code}")
        print(f"[generate_flash_cards] Raw API Response Text: {response.text}")
        
        response.raise_for_status()
        
        try:
            response_json = response.json()
        except json.JSONDecodeError as e:
            print(f"Failed to parse API response as JSON: {response.text}")
            raise ValueError(f"Invalid JSON in API response: {str(e)}")
            
        if not isinstance(response_json, dict):
            print(f"Unexpected API response format: {response_json}")
            raise ValueError("API response is not a valid JSON object")
            
        if "choices" not in response_json:
            print(f"Missing 'choices' in response: {response_json}")
            raise ValueError("Invalid API response format: missing 'choices' field")
            
        choices = response_json["choices"]
        if not isinstance(choices, list) or not choices:
            print(f"Invalid 'choices' format: {choices}")
            raise ValueError("Invalid API response format: 'choices' field is not a valid array")
            
        first_choice = choices[0]
        if not isinstance(first_choice, dict):
            print(f"Invalid choice format: {first_choice}")
            raise ValueError("Invalid API response format: choice is not a valid object")
            
        message = first_choice.get("message")
        if not message or not isinstance(message, dict):
            print(f"Invalid message format: {message}")
            raise ValueError("Invalid API response format: missing or invalid 'message' field")
            
        content = message.get("content")
        if not content:
            print("Empty content in API response")
            raise ValueError("Invalid API response format: empty content field")
            
        if not isinstance(content, str):
            print(f"Invalid content format: {content}")
            raise ValueError("Invalid API response format: content is not a string")
            
        try:
            # Clean content by removing markdown code block markers if present
            cleaned_content = content
            if content.startswith('```') and content.endswith('```'):
                # Extract content between markdown markers
                lines = content.split('\n')
                if len(lines) > 2:  # At least 3 lines (opening marker, content, closing marker)
                    # Skip first line (opening marker) and last line (closing marker)
                    cleaned_content = '\n'.join(lines[1:-1])
                    # If first line contains language identifier (e.g., ```json), skip it
                    if cleaned_content.startswith('json') or cleaned_content.startswith('JSON'):
                        cleaned_content = '\n'.join(lines[2:-1])
            
            print(f"[generate_flash_cards] Attempting to parse cleaned content: {cleaned_content}")
            parsed_content = json.loads(cleaned_content)
            print(f"[generate_flash_cards] Parsed Content: {parsed_content}")
            
            if not isinstance(parsed_content, dict) or 'quiz' not in parsed_content:
                    raise ValueError("API response is missing 'quiz' key")
            quiz_data = parsed_content['quiz']
            if not isinstance(quiz_data, list):
                print(f"Invalid parsed content format: {parsed_content}")
                raise ValueError("API response content is not a valid array")
                
            # Convert each item in the list to FlashCard model
            flash_cards = []
            for card in quiz_data:
                if not isinstance(card, dict):
                    print(f"Invalid flash card format: {card}")
                    continue
                
                # Set default difficulty if not provided
                if 'difficulty' not in card:
                    card['difficulty'] = 3
                
                flash_cards.append(FlashCard(**card))
            
            return flash_cards
            
        except json.JSONDecodeError as e:
            print(f"JSON parsing error at position {e.pos}, line {e.lineno}, column {e.colno}")
            print(f"Content causing error: {cleaned_content}")
            raise ValueError(f"Failed to parse API response content: {str(e)}")
            
    except requests.exceptions.RequestException as e:
        print(f"[generate_flash_cards] API request failed: {str(e)}")
        raise ValueError(f"API request failed: {str(e)}")
    except Exception as e:
        print(f"[generate_flash_cards] Unexpected error: {str(e)}")
        raise ValueError(f"Unexpected error while processing API response: {str(e)}")



# Example usage (optional, for testing)
if __name__ == '__main__':
    # Test generate_key_points
    sample_notes_for_key_points = """
    Biology Notes:
    Cell Theory: All living things are composed of cells. Cells are the basic unit of life. New cells arise from existing cells.
    Photosynthesis: Process used by plants to convert light energy into chemical energy. Occurs in chloroplasts. Equation: 6CO2 + 6H2O -> C6H12O6 + 6O2.
    """
    try:
        print("\nTesting generate_key_points...")
        key_points_result = generate_key_points(sample_notes_for_key_points)
        print(f"Key Points Result: {json.dumps(key_points_result, indent=2)}")
    except ValueError as e:
        print(f"Error in generate_key_points test: {e}")

    # Test generate_flash_cards
    sample_notes_for_flash_cards = """
    History Notes:
    World War I: Started in 1914, ended in 1918. Key players: Allied Powers (France, UK, Russia, later US) and Central Powers (Germany, Austria-Hungary, Ottoman Empire).
    Cause: Assassination of Archduke Franz Ferdinand.
    """
    try:
        print("\nTesting generate_flash_cards...")
        flash_cards_result = generate_flash_cards(sample_notes_for_flash_cards)
        print(f"Flash Cards Result: {json.dumps(flash_cards_result, indent=2)}")
    except ValueError as e:
        print(f"Error in generate_flash_cards test: {e}")

    # Test generate_quiz
    sample_notes_for_quiz = """
    Geography Notes:
    Continents: Asia, Africa, North America, South America, Antarctica, Europe, Australia.
    Oceans: Pacific, Atlantic, Indian, Arctic, Southern.
    Largest Continent: Asia.
    """
    try:
        print("\nTesting generate_quiz...")
        quiz_result = generate_quiz(sample_notes_for_quiz)
        print(f"Quiz Result: {json.dumps(quiz_result, indent=2)}")
    except ValueError as e:
        print(f"Error in generate_quiz test: {e}")

    # Test organize_notes
    sample_notes_for_organization = """
    Physics: Newton's Laws of Motion. First Law: Inertia. Second Law: F=ma. Third Law: Action-reaction.
    Chemistry: Atomic Structure. Protons, Neutrons, Electrons. Nucleus contains protons and neutrons.
    Biology: DNA structure. Double helix. Bases: Adenine, Thymine, Cytosine, Guanine.
    """
    try:
        print("\nTesting organize_notes...")
        organization_result = organize_notes(sample_notes_for_organization)
        print(f"Organization Result: {json.dumps(organization_result, indent=2)}")
    except ValueError as e:
        print(f"Error in organize_notes test: {e}")

    # Test generate_study_plan
    sample_schedule_data = json.dumps({
        "available_time_slots": {
            "Monday": ["9am-11am", "2pm-4pm"],
            "Tuesday": ["10am-12pm"],
            "Wednesday": ["1pm-5pm"]
        },
        "tasks": [
            {"topic": "Calculus Chapter 1", "priority": "High", "estimated_hours": 3},
            {"topic": "Physics Mechanics Review", "priority": "Medium", "estimated_hours": 4},
            {"topic": "History Essay Outline", "priority": "Low", "estimated_hours": 2}
        ]
    })
    try:
        print("\nTesting generate_study_plan...")
        study_plan_result = generate_study_plan(sample_schedule_data)
        print(f"Study Plan Result: {json.dumps(study_plan_result, indent=2)}")
    except ValueError as e:
        print(f"Error in generate_study_plan test: {e}")

    # Test QuizResponseAnalysis (direct instantiation as it's a Pydantic model)
    print("\nTesting QuizResponseAnalysis...")
    try:
        analysis_data = {
            "knowledge_gaps": ["Topic A", "Concept B"],
            "answer_improvements": {"Question 1": "Consider adding more detail about X."},
            "study_recommendations": ["Review chapter 3", "Practice more problems on Y"],
            "overall_score": 75.5
        }
        quiz_analysis = QuizResponseAnalysis(**analysis_data)
        print(f"Quiz Analysis: {quiz_analysis.model_dump_json(indent=2)}")
    except Exception as e:
        print(f"Error in QuizResponseAnalysis test: {e}")
