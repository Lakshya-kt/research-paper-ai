"use client";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import axios from "axios";

export default function Home() {

  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [question,setQuestion]= useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [chatLoading,setChatLoading]= useState(false);
  const [flashcards, setFlashcards] = useState("");
  const [FlashcardLoading, setFlashcardLoading] = useState(false);
  const [paperText, setPaperText] = useState("");
  // Upload PDF
  const uploadFile = async () => {


    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {

      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      
      console.log(data);

      setSummary(data.summary);
      setPaperText(data.paper_text);

    } catch (error) {

      console.error("ERROR:", error);
      alert("Upload failed");
    }finally {

      setLoading(false);
    }
  };

    // Ask question
  const askQuestion = async () => {

    if (!question) return;

    const userMessage = {
      role: "user",
      content: question,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);


    try {

      setChatLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: question,
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      const aiMessage = {
        role: "assistant",
        content: data.answer,
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

    setQuestion("");
    
    } catch (error) {

      console.error(error);

    } finally {

      setChatLoading(false);
    }
  };
  const generateFlashcards = async () => {

    try {

      setFlashcardLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/flashcards`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: paperText,
          }),
        }
      );

      const data = await response.json();

      setFlashcards(data.flashcards);

    } catch (error) {

      console.error(error);

    } finally {

      setFlashcardLoading(false);
    }
  };

  return (

    <div className="min-h-screen p-10 bg-gray-100">

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">

        <h1 className="text-4xl font-bold mb-6">
          Research Paper AI
        </h1>

        {/* Upload Section */}

        <div className="flex gap-4 items-center">

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => {

              if (e.target.files && e.target.files[0]) {
                setFile(e.target.files[0]);
              }
            }}
            className="border p-2 rounded"
          />

          <button
            onClick={uploadFile}
            disabled={loading}
            className="bg-black text-white px-5 py-2 rounded"
          >
            {loading ? "Generating..." : "Upload"}
          </button>

        </div>

        {loading && (

          <div className="mt-6 text-lg">
            AI is analyzing the research paper...
          </div>
        )}

        {/* Summary */}
        {summary && (

          <div className="mt-10">

            <h2 className="text-2xl font-semibold mb-4">
              AI Summary
            </h2>

            <div className="bg-gray-50 border p-5 rounded-lg prose max-w-none">
              <ReactMarkdown>
                {summary}
              </ReactMarkdown>
            </div>

          </div>
        )}
        <button
          onClick={generateFlashcards}
          className="mt-6 bg-green-600 text-white px-5 py-3 rounded"
        >
          Generate Flashcards
        </button>
        {flashcards && (

          <div className="mt-8">

            <h2 className="text-2xl font-semibold mb-4">
              Flashcards
            </h2>

            <div className="bg-green-50 border p-5 rounded-lg whitespace-pre-wrap leading-7">
              {flashcards}
            </div>

          </div>
        )}

        {/* Chat Section */}

        {summary && (

          <div className="mt-10">

            <h2 className="text-2xl font-semibold mb-4">
              Chat With Paper
            </h2>

            <div className="flex gap-4">

              <input
                type="text"
                placeholder="Ask a question..."
                value={question}
                onChange={(e) =>
                  setQuestion(e.target.value)
                }
                className="flex-1 border p-3 rounded"
              />

              <button
                onClick={askQuestion}
                className="bg-blue-600 text-white px-5 py-3 rounded"
              >
                Ask
              </button>

            </div>

            {chatLoading && (

              <div className="mt-5">
                AI is thinking...
              </div>
            )}

            {messages.length > 0  && (

              <div className="mt-6 space-y-4">

                {messages.map((msg,index)=>(
                  <div
                  key={index}
                  className={
                    msg.role =="user"
                    ? "bg-gray-200 p-4 rounded-lg"
                    : "bg-blue-50 p-4 rounded-lg"
                  }
                >
                  <p className="font-semibold mb-1">
                    {msg.role === "user"
                      ? "You"
                      : "AI"}
                  </p>

                  <div className="prose max-w-none">
                    <ReactMarkdown>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
                ))}
                
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
}