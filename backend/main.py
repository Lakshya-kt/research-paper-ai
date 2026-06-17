from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import os
import fitz
import google.generativeai as genai
from dotenv import load_dotenv
from rag import build_vector_store, retrieve_relevant_chunks
from rag import document_chunks
load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("models/gemini-2.5-flash")
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://research-paper-ai-henna.vercel.app",
                   "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
UPLOAD_FOLDER="uploads"

os.makedirs(UPLOAD_FOLDER,exist_ok=True)

@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    # Save PDF
    with open(file_path, "wb") as f:
        f.write(await file.read())

    # Open PDF
    doc = fitz.open(file_path)

    text = ""

    # Extract text
    for page in doc:
        text += page.get_text()
    # Limit text size
    build_vector_store(text)
    paper_text = text[:15000]
    
    prompt = f"""
    Teach the concepts from this research paper.

    Format:

    1. Core Concepts
    2. Important Terms
    3. Methods Explained Simply
    4. Key Equations Explained
    5. Real World Applications

    Do NOT summarize the paper.
    Teach the ideas inside it.
    Use markdown formatting.
    Use headings and bullet points.
    
    Paper:
    {paper_text}
    """
    response=model.generate_content(prompt)
    
    return {
        "filename": file.filename,
        "summary": response.text,
        "paper_text": paper_text
    }
    
@app.post("/chat")
async def chat_with_paper(data: dict):
    question=data["question"]
    relevant_chunks=retrieve_relevant_chunks(question)
    context="\n\n".join(relevant_chunks)
    prompt = f"""
    Answer the question using the research paper context.

    Context:
    {context}

    Question:
    {question}

    Give a clear educational explanation.
    """
    response = model.generate_content(prompt)

    return {
        "answer": response.text
    }

@app.post("/flashcards")
async def generate_flashcards(data:dict):
    
    try:

        content = data["content"]

        prompt = f"""
        Generate educational flashcards from this research content.

        Rules:
        - Focus on concepts
        - Keep answers concise
        - Educational style

        Format:

        Q: ...
        A: ...

        Content:
        {content}
        """

        response = model.generate_content(prompt)

        return {
            "flashcards": response.text
        }

    except Exception as e:

        return {
            "flashcards": str(e)
        }