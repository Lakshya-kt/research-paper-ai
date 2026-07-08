export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">

      <div className="text-center">

        <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium">
          AI Powered Learning
        </span>

        <h1 className="mt-8 text-6xl font-extrabold text-slate-900 leading-tight">

          Understand
          <br />

          <span className="text-blue-600">
            Research Papers
          </span>

          <br />

          Like Never Before

        </h1>

        <p className="mt-8 text-xl text-slate-600 max-w-3xl mx-auto">

          Upload any research paper and let AI explain concepts,
          answer questions, generate flashcards and help you
          truly understand difficult research.

        </p>

        <div className="mt-14 flex justify-center gap-4 flex-wrap">

          <div className="rounded-2xl bg-white shadow p-6 w-40">
            <div className="text-4xl">📄</div>

            <p className="mt-3 font-semibold">
              Upload
            </p>
          </div>

          <div className="rounded-2xl bg-white shadow p-6 w-40">
            <div className="text-4xl">🧠</div>

            <p className="mt-3 font-semibold">
              Explain
            </p>
          </div>

          <div className="rounded-2xl bg-white shadow p-6 w-40">
            <div className="text-4xl">💬</div>

            <p className="mt-3 font-semibold">
              Chat
            </p>
          </div>

          <div className="rounded-2xl bg-white shadow p-6 w-40">
            <div className="text-4xl">🎓</div>

            <p className="mt-3 font-semibold">
              Flashcards
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}