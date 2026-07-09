
# 📚 Research Paper AI

An AI-powered research assistant that transforms complex research papers into interactive learning material. Upload any research paper in PDF format and instantly receive concept-based explanations, ask questions in natural language, and generate flashcards for revision.

---

## 🚀 Overview

Reading research papers can be time-consuming and challenging, especially when encountering unfamiliar concepts or dense technical explanations. Research Paper AI simplifies this process by converting research papers into an interactive learning experience rather than just producing a summary.

The application extracts the paper's content, builds a semantic knowledge base using vector embeddings, and enables users to interact with the document through conversational AI.

---

## ✨ Features

* 📄 Upload research papers in PDF format
* 🧠 AI-generated concept-based explanations
* 💬 Chat with the uploaded research paper
* 🔍 Retrieval-Augmented Generation (RAG) for context-aware responses
* 📝 Automatic flashcard generation
* 📖 Markdown rendering for clean formatting
* ⚡ Fast semantic search using vector embeddings
* 🎨 Modern responsive user interface

---

## 🏗️ Architecture

```text
                +----------------------+
                |   Next.js Frontend   |
                +----------+-----------+
                           |
                           |
                     REST API Calls
                           |
                           ▼
                +----------------------+
                |     FastAPI Backend  |
                +----------+-----------+
                           |
          +----------------+----------------+
          |                                 |
          ▼                                 ▼
 PDF Text Extraction               Gemini Embeddings
 (PyMuPDF)                         + Vector Search
          |                                 |
          +----------------+----------------+
                           |
                           ▼
                 Gemini 2.5 Flash Model
                           |
                           ▼
          Summary • Chat • Flashcards
```

---

## 🛠️ Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* React Markdown

### Backend

* FastAPI
* Python
* PyMuPDF (fitz)
* Google Gemini API
* NumPy
* FAISS (or Gemini Embeddings based retrieval)

### AI

* Gemini 2.5 Flash
* Gemini Embedding Model
* Retrieval-Augmented Generation (RAG)

---

## 📂 Project Structure

```text
research-paper-ai
│
├── backend
│   ├── main.py
│   ├── rag.py
│   ├── uploads/
│   └── requirements.txt
│
├── frontend
│   ├── app/
│   ├── components/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/<your-username>/research-paper-ai.git

cd research-paper-ai
```

---

### Backend Setup

```bash
cd backend

python -m venv .venv

# Windows
.venv\Scripts\activate

pip install -r requirements.txt
```

Create a `.env` file inside the backend directory.

```env
GEMINI_API_KEY=YOUR_API_KEY
```

Run the backend

```bash
uvicorn main:app --reload
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Create a `.env.local` file.

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

---

## 📖 Usage

1. Launch both the backend and frontend servers.
2. Upload a research paper in PDF format.
3. Allow the application to analyze the paper.
4. Explore the AI-generated explanation.
5. Ask questions through the chat interface.
6. Generate flashcards for revision.

---

## 💡 How It Works

1. The uploaded PDF is processed using PyMuPDF.
2. The extracted text is divided into manageable chunks.
3. Each chunk is converted into semantic embeddings.
4. A vector index is created for efficient retrieval.
5. User questions retrieve the most relevant chunks.
6. Retrieved context is combined with the user's query.
7. Gemini 2.5 Flash generates an accurate, context-aware response.

---

## 🎯 Future Improvements

* Multi-paper knowledge base
* Research paper comparison
* Citation-aware answers
* Export flashcards to Anki
* PDF annotation support
* Conversation memory across sessions
* User authentication
* Paper bookmarking
* Audio explanations
* Quiz generation

---

## 📸 Screenshots

Add screenshots of:

* <img width="1910" height="899" alt="Screenshot 2026-07-08 181156" src="https://github.com/user-attachments/assets/c9eecb57-65fe-4ed4-8ac8-27085cd73d31" />

* <img width="1557" height="607" alt="Screenshot 2026-07-08 181127" src="https://github.com/user-attachments/assets/94c54ed9-8c85-474d-b89e-63bc4a8a71e7" />

* <img width="911" height="735" alt="Screenshot 2026-07-09 153013" src="https://github.com/user-attachments/assets/d1b089ee-5abe-4f97-892f-81f04cc63490" />

* <img width="1609" height="882" alt="Screenshot 2026-07-09 153210" src="https://github.com/user-attachments/assets/14911627-1997-4a31-a388-991d34bc7e9c" />


---

## 🤝 Contributing

Contributions are welcome. Feel free to fork the repository, create a feature branch, and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Lakshya Kothari**

If you found this project helpful, consider giving it a ⭐ on GitHub.
