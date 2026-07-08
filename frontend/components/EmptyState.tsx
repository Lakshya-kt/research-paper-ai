"use client";

import Card from "./ui/Card";

export default function EmptyState() {
  return (
    <Card className="mt-10">

      <div className="flex flex-col items-center text-center py-14">

        <div className="text-7xl">
          📚
        </div>

        <h2 className="mt-6 text-3xl font-bold text-slate-900">
          Upload Your First Research Paper
        </h2>

        <p className="mt-4 text-slate-500 max-w-2xl leading-7">
          Upload any research paper in PDF format and Research Paper AI
          will explain difficult concepts, answer questions, and generate
          study flashcards to help you learn faster.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-12 w-full">

          <FeatureCard
            icon="🧠"
            title="AI Explanation"
            description="Understand complex ideas with simple educational explanations."
          />

          <FeatureCard
            icon="💬"
            title="Ask Questions"
            description="Chat naturally with your research paper."
          />

          <FeatureCard
            icon="🎓"
            title="Study Flashcards"
            description="Generate revision-ready flashcards instantly."
          />

        </div>

      </div>

    </Card>
  );
}

interface FeatureProps {
  icon: string;
  title: string;
  description: string;
}

function FeatureCard({
  icon,
  title,
  description,
}: FeatureProps) {
  return (
    <div
      className="
      rounded-2xl
      border
      border-slate-200
      p-6
      hover:shadow-lg
      hover:-translate-y-1
      transition-all
      bg-gradient-to-br
      from-white
      to-slate-50
      "
    >
      <div className="text-4xl">
        {icon}
      </div>

      <h3 className="mt-4 text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-3 text-slate-500 text-sm leading-6">
        {description}
      </p>
    </div>
  );
}