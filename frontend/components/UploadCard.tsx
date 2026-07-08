"use client";

import Card from "./ui/Card";
import Button from "./ui/Button";
import Spinner from "./ui/Spinner";

interface Props {
  file: File | null;
  loading: boolean;
  setFile: (file: File | null) => void;
  uploadFile: () => void;
}

export default function UploadCard({
  file,
  loading,
  setFile,
  uploadFile,
}: Props) {
  return (
    <Card className="mt-12">

      <h2 className="text-3xl font-bold">
        Upload Research Paper
      </h2>

      <p className="text-slate-500 mt-2">
        Upload a PDF and let AI teach you the concepts inside.
      </p>

      <div className="mt-8 border-2 border-dashed border-slate-300 rounded-2xl p-10 text-center">

        <div className="text-6xl">
          📄
        </div>

        <p className="mt-4 text-lg font-medium">
          Drag & Drop PDF
        </p>

        <p className="text-slate-500 mt-2">
          or choose a file
        </p>

        <input
          type="file"
          accept=".pdf"
          className="mt-6 block mx-auto"
          onChange={(e) => {
            if (e.target.files?.length) {
              setFile(e.target.files[0]);
            }
          }}
        />

        {file && (
          <div className="mt-5 text-green-600 font-medium">
            Selected:
            {" "}
            {file.name}
          </div>
        )}

        <div className="mt-8">
          <Button
            onClick={uploadFile}
            disabled={loading}
          >
            {loading
              ? "Generating..."
              : "Upload PDF"}
          </Button>
        </div>

        {loading && (
          <Spinner
            text="Analyzing research paper..."
          />
        )}

      </div>

    </Card>
  );
}