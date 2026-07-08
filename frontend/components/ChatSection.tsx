"use client";

import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Card from "./ui/Card";
import Spinner from "./ui/Spinner";

interface Message {
  role: string;
  content: string;
}

interface Props {
  question: string;
  setQuestion: (value: string) => void;

  askQuestion: () => void;

  messages: Message[];

  loading: boolean;
}

export default function ChatSection({
  question,
  setQuestion,
  askQuestion,
  messages,
  loading,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <Card className="mt-10">

      <h2 className="text-3xl font-bold">
        Chat with your Paper
      </h2>

      <p className="text-slate-500 mt-2">
        Ask anything about the uploaded research paper.
      </p>

      <div
        className="
        mt-8
        h-[500px]
        overflow-y-auto
        rounded-xl
        bg-slate-50
        border
        p-6
        space-y-5
        "
      >
        {messages.length === 0 && !loading && (
          <div className="h-full flex items-center justify-center text-slate-400">
            Start by asking a question.
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`
              max-w-[80%]
              rounded-2xl
              px-5
              py-4
              shadow-sm

              ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white border"
              }
              `}
            >
              <div
                className={`
                text-xs
                font-semibold
                mb-2

                ${
                  msg.role === "user"
                    ? "text-blue-100"
                    : "text-slate-500"
                }
                `}
              >
                {msg.role === "user"
                  ? "You"
                  : "Research AI"}
              </div>

              <div
                className={`
                prose
                max-w-none

                ${
                  msg.role === "user"
                    ? "prose-invert"
                    : ""
                }
                `}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <Spinner text="Thinking..." />
        )}

        <div ref={bottomRef} />
      </div>

      <div className="mt-6 flex gap-4">

        <input
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !e.shiftKey
            ) {
              e.preventDefault();
              askQuestion();
            }
          }}
          placeholder="Ask about the paper..."
          className="
          flex-1
          rounded-xl
          border
          p-4
          outline-none
          focus:ring-2
          focus:ring-blue-500
          "
        />

        <button
          onClick={askQuestion}
          className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-8
          rounded-xl
          "
        >
          Send
        </button>

      </div>

    </Card>
  );
}