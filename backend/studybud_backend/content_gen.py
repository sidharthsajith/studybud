import json
import together
from pydantic import BaseModel, Field
import os
from dotenv import load_dotenv
load_dotenv()

client = together.Together(api_key=os.getenv("TOGETHER_API_KEY"))

class assignment_helper(BaseModel):
    title: str = Field(description="A title for the generation of the content")
    points: list = Field(description="Points to be included in the content")
    keywords: list = Field(description="A list of keywords to be included in the content")

class enhancer_assignment(BaseModel):
    clarity: list = Field(description="Tips to improve the clarity of the provided draft")
    structure: list = Field(description="Tips to improve the structure of the provided draft")
    writing_style: str = Field(description="Tips to improve the writing style of the provided draft")
    vocabulary: list = Field(description="Tips to improve the vocabulary of the provided draft")
    grammar: list = Field(description="Tips to improve the grammar of the provided draft")
    coherence: list = Field(description="Tips to improve the coherence of the provided draft")
    logical_flow: list = Field(description="Tips to improve the logical flow of the provided draft")
    readability: list = Field(description="Tips to improve the readability of the provided draft")
    overall: list = Field(description="Tips to improve the overall quality of the provided draft")

def generate_assignment(assignment: str) -> assignment_helper:
    """
    Generates a title and a list of points to be included in the assignment.
    Args:
        assignment (str): The assignment to be completed.
    Returns:
        assignment_helper: A assignment_helper object containing the title and points.
    """
    client = together.Together(api_key=os.getenv("TOGETHER_API_KEY"))
    extract = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "The following is an assigment to be completed by the user. I want you to generate a title and a list of points to be included in the assignment. Only answer in JSON.",
                },
                {
                    "role": "user",
                    "content": f"{assignment}",
                },
            ],
            model="meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
            response_format={
                "type": "json_object",
                "schema": assignment_helper.model_json_schema(),
            },
        )

    output = json.loads(extract.choices[0].message.content)
    return assignment_helper.model_validate(output)



def enhance_assignment(assignment: str) -> enhancer_assignment:
    """
    Generates tips to improve the quality of the assignment.
    Args:
        assignment (str): The assignment to be enhanced.
    Returns:
        enhancer_assignment: An enhancer_assignment object containing improvement tips.
    """
    try:
        client = together.Together(api_key=os.getenv("TOGETHER_API_KEY"))
        extract = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "The following is an assignment to be completed by the user. Generate a list of tips to improve the quality of the assignment. Provide tips for clarity, structure, writing style, vocabulary, grammar, coherence, logical flow, readability, and overall improvement. Ensure all tips are in list format except writing_style which should be a string. Only answer in JSON format.",
                },
                {
                    "role": "user",
                    "content": f"{assignment}",
                }
            ],
            model="meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
            response_format={
                "type": "json_object",
                "schema": enhancer_assignment.model_json_schema(),
            },
        )

        if not extract.choices or not extract.choices[0].message or not extract.choices[0].message.content:
            raise ValueError("Invalid response from Together API")

        response_content = json.loads(extract.choices[0].message.content)
        if isinstance(response_content, dict):
            return enhancer_assignment.model_validate(response_content)
        raise ValueError("API response is not a valid dictionary")
    except json.JSONDecodeError as e:
        raise ValueError(f"Failed to parse API response: {str(e)}")
    except Exception as e:
        raise ValueError(f"Error enhancing assignment: {str(e)}")