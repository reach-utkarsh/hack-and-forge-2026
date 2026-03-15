import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import anthropic

# This path logic ensures it finds the .env at the very top level
base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
dotenv_path = os.path.join(base_dir, ".env")
load_dotenv(dotenv_path)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize client using the key from .env
api_key = os.getenv("CLAUDE_API_KEY")
client = anthropic.Anthropic(api_key=api_key)

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def read_root():
    return {"status": "online", "key_found": bool(api_key)}

@app.post("/chat")
async def chat_with_ai(request: ChatRequest):
    if not api_key:
        raise HTTPException(status_code=500, detail="API Key not found. Check your .env path.")
    
    try:
        # We are using the 'sonnet' model which is the best for hackathons
        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=1024,
            messages=[{"role": "user", "content": request.message}]
        )
        return {"reply": response.content[0].text}
    except Exception as e:
        print(f"ERROR: {str(e)}") # This will show the specific reason in Cursor terminal
        raise HTTPException(status_code=500, detail=str(e))