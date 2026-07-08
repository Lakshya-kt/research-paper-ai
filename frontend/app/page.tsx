"use client";
import { useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import UploadCard from "@/components/UploadCard";
import SummaryCard from "@/components/SummaryCard";
import EmptyState from "@/components/EmptyState";
import ChatSection from "@/components/ChatSection";
import Flashcards from "@/components/Flashcards";
import LoadingOverlay from "@/components/LoadingOverlay";
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
      setMessages([]);

    } catch (error) {

      console.error("ERROR:", error);
      alert("Upload failed");
    }finally {

      setLoading(false);
    }
  };

    // Ask question
  const askQuestion = async () => {

    if (!question.trim()) return;
    
    const userMessage = {
      role: "user",
      content: question,
    };

      // Create updated history
    const updatedMessages = [...messages, userMessage];

    // Show user message immediately
    setMessages(updatedMessages);


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
            history:messages,
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      const aiMessage = {
        role: "assistant",
        content: data.answer,
      };

      setMessages((prev) => [...prev, aiMessage]);

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
    <div className="min-h-screen bg-slate-100">

      <LoadingOverlay open={loading} />

      <Navbar />

      <Hero />

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">

        <UploadCard
          file={file}
          loading={loading}
          setFile={setFile}
          uploadFile={uploadFile}
        />

        {!summary && !loading && (
          <EmptyState />
        )}

        {summary && (
          <>
            <SummaryCard
              summary={summary}
            />

            <Flashcards
              flashcards={flashcards}
              loading={FlashcardLoading}
              generateFlashcards={generateFlashcards}
            />

            <ChatSection
              question={question}
              setQuestion={setQuestion}
              askQuestion={askQuestion}
              messages={messages}
              loading={chatLoading}
            />
          </>
        )}

      </main>

      <Footer />

    </div>
  );
}