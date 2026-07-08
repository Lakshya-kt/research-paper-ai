"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Card from "./ui/Card";

interface Props {
  summary: string;
}

export default function SummaryCard({
  summary,
}: Props) {

  if (!summary) return null;

  const copySummary = async () => {
    await navigator.clipboard.writeText(summary);
    alert("Summary copied!");
  };

  return (
    <Card
      className="mt-10"
    >
      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-3xl font-bold">
            AI Explanation
          </h2>

          <p className="text-slate-500 mt-1">
            Concepts explained from the uploaded paper.
          </p>

        </div>

        <button
          onClick={copySummary}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition"
        >
          Copy
        </button>

      </div>

      <article
        className="
        prose
        prose-slate
        max-w-none
        prose-headings:text-slate-900
        prose-p:text-slate-700
        prose-li:text-slate-700
        prose-strong:text-slate-900
        prose-code:text-blue-700
        prose-pre:bg-slate-900
        prose-pre:text-white
      "
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {summary}
        </ReactMarkdown>
      </article>

    </Card>
  );
}