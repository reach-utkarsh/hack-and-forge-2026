# Hack & Forge 2026

A 24-hour AI hackathon project scaffold with a FastAPI backend and React + Tailwind frontend.

## Tech Stack

- **Backend:** Python, FastAPI
- **Frontend:** React, Tailwind CSS, Vite
- **APIs:** OpenAI, Claude, Google (configure via `.env`)

## Getting Started

### Prerequisites

- Python 3.x
- Node.js and npm (or pnpm)

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Test the API: open [http://127.0.0.1:8000](http://127.0.0.1:8000) or run `curl http://127.0.0.1:8000`. You should see `{"status":"active"}`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the URL shown in the terminal (typically [http://localhost:5173](http://localhost:5173)).

### Environment

Copy the root `.env` file and add your API keys locally. **Do not commit `.env` or real keys.**

```env
OPENAI_API_KEY=your_key_here
CLAUDE_API_KEY=your_key_here
GOOGLE_API_KEY=your_key_here
```
