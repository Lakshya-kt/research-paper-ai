"use client";

import Spinner from "./ui/Spinner";

interface Props {
  open: boolean;
}

export default function LoadingOverlay({
  open,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="
      fixed
      inset-0
      z-50
      bg-black/40
      backdrop-blur-sm
      flex
      items-center
      justify-center
      "
    >
      <div
        className="
        bg-white
        rounded-3xl
        p-10
        shadow-2xl
        w-[420px]
        "
      >
        <Spinner size="lg" />

        <h2 className="text-2xl font-bold text-center mt-6">
          Analyzing Research Paper
        </h2>

        <p className="text-slate-500 text-center mt-3">
          AI is extracting concepts and building
          a searchable knowledge base.
        </p>

        <div className="mt-8 space-y-5">

          <LoadingStep
            done
            text="Uploading PDF"
          />

          <LoadingStep
            done
            text="Extracting Text"
          />

          <LoadingStep
            done
            text="Creating Embeddings"
          />

          <LoadingStep
            active
            text="Generating Explanation"
          />

        </div>

      </div>
    </div>
  );
}

function LoadingStep({
  text,
  done,
  active,
}: {
  text: string;
  done?: boolean;
  active?: boolean;
}) {
  return (
    <div className="flex items-center gap-4">

      {done && (
        <div className="text-green-600 text-xl">
          ✓
        </div>
      )}

      {active && (
        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      )}

      {!done && !active && (
        <div className="w-5 h-5 rounded-full border" />
      )}

      <p
        className={
          done
            ? "text-slate-700"
            : active
            ? "font-semibold text-blue-600"
            : "text-slate-400"
        }
      >
        {text}
      </p>

    </div>
  );
}