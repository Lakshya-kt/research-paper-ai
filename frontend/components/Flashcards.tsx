"use client";

import Card from "./ui/Card";
import Spinner from "./ui/Spinner";

interface Props {
  flashcards: string;
  loading: boolean;
  generateFlashcards: () => void;
}

export default function Flashcards({
  flashcards,
  loading,
  generateFlashcards,
}: Props) {
  function parseCards(text: string) {
    if (!text) return [];

    const cards = [];

    const sections = text.split("Q:");

    for (const section of sections) {
      if (!section.trim()) continue;

      const parts = section.split("A:");

      if (parts.length < 2) continue;

      cards.push({
        question: parts[0].trim(),
        answer: parts[1].trim(),
      });
    }

    return cards;
  }

  const cards = parseCards(flashcards);

  return (
    <Card className="mt-12">

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-3xl font-bold">
            Flashcards
          </h2>

          <p className="text-slate-500 mt-2">
            Revise important concepts quickly.
          </p>

        </div>

        <button
          onClick={generateFlashcards}
          className="
          bg-green-600
          hover:bg-green-700
          text-white
          px-6
          py-3
          rounded-xl
          "
        >
          Generate
        </button>

      </div>

      {loading && (
        <Spinner text="Generating flashcards..." />
      )}

      {!loading && cards.length > 0 && (

        <div className="grid md:grid-cols-2 gap-6 mt-10">

          {cards.map((card, index) => (

            <div
              key={index}
              className="
              rounded-2xl
              border
              p-6
              bg-gradient-to-br
              from-white
              to-blue-50
              shadow-sm
              hover:shadow-lg
              transition
              "
            >

              <div className="text-blue-600 font-bold">
                Question
              </div>

              <p className="mt-2 font-medium">
                {card.question}
              </p>

              <div className="mt-6 text-green-700 font-bold">
                Answer
              </div>

              <p className="mt-2 text-slate-700">
                {card.answer}
              </p>

            </div>

          ))}

        </div>

      )}

    </Card>
  );
}