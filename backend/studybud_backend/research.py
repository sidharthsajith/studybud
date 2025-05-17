import json
import os
import requests
from pydantic import BaseModel, Field
from typing import List, Dict
from bs4 import BeautifulSoup
from dotenv import load_dotenv
load_dotenv()
import requests
from together import Together




TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")

MODEL_NAME = "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo"

# Common headers for Together AI API requests
def get_together_headers():
    return {
        "Authorization": f"Bearer {TOGETHER_API_KEY}",
        "Content-Type": "application/json",
        "User-Agent": "StudyBud/1.0.0"
    }

def extract_data(URL: str) -> str:
    """
    Extracts data from a given link.
    Args:
        link (str): The link to extract data from.
    Returns:
        str: The extracted data.
    """
    r = requests.get(URL)
    response = requests.get(URL)
    html_content = response.text
    soup = BeautifulSoup(html_content, 'html.parser')
    text = soup.get_text()
    return text
    

class Research(BaseModel):
    title: str = Field(description="Title of the research paper")
    suggestions: List[str] = Field(description="Suggestions for to make the research paper more interesting")
    keywords: List[str] = Field(description="Keywords extracted from the dumped data")
    concepts: List[str] = Field(description="Key concepts covered in the data")

def research_paper(link: str) -> Research:
    """
    Conducts research on a given title and returns a Research object.
    Args:
        link (str): The link to the research paper.
    Returns:
        Research: A Research object containing the title, suggestions, keywords, and concepts.
    """
    client = Together()
    data = extract_data(link)

    extract = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "The following is a research paper. Extract the title, suggestions, keywords, and concepts from the paper. Only answer in JSON.",
            },
            {
                "role": "user",
                "content": data,
            },
        ],
        model="meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
        response_format={
            "type": "json_object",
            "schema": Research.model_json_schema(),
        },
    )

    output = json.loads(extract.choices[0].message.content)
    return output



print(research_paper("https://hackclub.com/"))