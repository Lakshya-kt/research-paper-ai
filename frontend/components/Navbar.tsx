export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xl">
            🧠
          </div>

          <div>
            <h1 className="font-bold text-lg text-slate-900">
              Research Paper AI
            </h1>

            <p className="text-xs text-slate-500">
              Learn research papers with AI
            </p>
          </div>
        </div>

        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <a href="#summary" className="hover:text-blue-600 transition">
            Summary
          </a>

          <a href="#chat" className="hover:text-blue-600 transition">
            Chat
          </a>

          <a href="#flashcards" className="hover:text-blue-600 transition">
            Flashcards
          </a>
        </nav>

        <a
          href="https://github.com/Lakshya-kt/research-paper-ai"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-slate-900 text-white px-5 py-2 hover:bg-slate-800 transition"
        >
          GitHub
        </a>
      </div>
    </header>
  );
}