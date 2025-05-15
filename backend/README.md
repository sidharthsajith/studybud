# StudyBud API - AI-Powered Study Assistant
StudyBud is an AI-powered study assistant that helps you organize, categorize, and extract key points from your study notes. It also generates interactive flashcards and study plans based on your notes.

## 🚀 Features
- **Note Organization**: Automatically categorize and structure your study notes by topic and concept
- **Key Point Extraction**: Identify and extract the most important points from your notes
- **Flashcard Generation**: Create interactive flashcards from your study materials
- **Study Plan Creation**: Generate optimized study schedules based on your availability

## 💻 Tech Stack
- **Backend**: FastAPI (Python)
- **AI Services**: OpenRouter API with Google's Gemma model
- **Data Modeling**: Pydantic
- **API Documentation**: Built-in FastAPI docs

## ⚡ Quick Start
1. Clone the repository
2. Install dependencies:
```bash
pip install -r requirements.txt
```
3. Set up your OpenRouter API key in `.env` file
4. Run the server:
```bash
uvicorn main:app --reload
```

## 📚 API Endpoints
- `POST /organize-notes` - Organize and categorize study notes
- `POST /extract-key-points` - Extract key points from notes
- `POST /generate-flash-cards` - Create flashcards from notes
- `POST /generate-study-plan` - Generate optimized study plan
- `GET /` - Welcome endpoint

Access interactive API docs at `http://localhost:8000/docs` after starting the server.

## 🔮 Future Improvements
- Add quiz generation functionality
- Implement spaced repetition algorithms
- Add user authentication
- Develop mobile companion app

## 🤝 Contributing
This is a hackathon project - contributions welcome! Please fork and submit PRs.

## 📜 License
MIT