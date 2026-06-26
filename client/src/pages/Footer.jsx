function Footer() {
  return (
    <footer className="bg-[#050d1a] border-t border-white/10 mt-32">

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="text-center">

          <h2 className="text-white text-3xl font-semibold">
            InterviewLens AI
          </h2>

          <p className="text-slate-400 mt-3 text-lg">
            AI-Powered Interview Failure Analyzer
          </p>

          <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
            Analyze interview performance, identify skill gaps,
            receive personalized improvement roadmaps and
            prepare smarter for your next opportunity.
          </p>

          <div className="flex justify-center gap-8 mt-8">

            <a
              href="https://github.com/aakanshimalik"
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/aakanshi-malik-996738298"
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition"
            >
              LinkedIn
            </a>

            <a
              href="https://aakanshi-portfolio.onrender.com/"
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition"
            >
              Portfolio
            </a>

          </div>

        </div>

      </div>

      <div className="border-t border-white/10 py-5">

        <p className="text-center text-slate-500 text-sm">
          Built by <span className="text-white">Aakanshi Malik</span>
          {" • "}
          © 2026 InterviewLens AI
        </p>

      </div>

    </footer>
  );
}

export default Footer;