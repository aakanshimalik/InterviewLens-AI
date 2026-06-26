import { useState } from "react";

function Documentation() {
    const [showGuide, setShowGuide] = useState(false);

    return (
        <>
            {/* Floating Button */}
            <div className="fixed bottom-8 right-8 z-40 group">

                <div
                    className="
          absolute right-16 top-3
          bg-amber-900
          text-white
          text-sm
          px-3 py-1
          rounded-lg
          opacity-0
          group-hover:opacity-100
          transition
          whitespace-nowrap
          "
                >
                    Need Help?
                </div>

                <button
                    onClick={() => setShowGuide(true)}
                    className="
          bg-amber-500
          hover:bg-amber-600
          text-white
          w-14 h-14
          rounded-full
          shadow-xl
          text-2xl
          hover:scale-110
          transition-all
          duration-300
          "
                >
                    📘
                </button>

            </div>

            {/* Modal */}
            {showGuide && (
                <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex justify-center items-center z-50">

                    <div className="bg-slate-900/80
backdrop-blur-xl
border
border-cyan-500/20
rounded-3xl
p-8
max-w-3xl
mx-4
shadow-2xl">

                        <div className="mb-6">

                            <h2 className="text-3xl font-bold text-white">
                                InterviewLens AI Documentation
                            </h2>

                            <p className="text-slate-400 mt-2">
                                Learn how to use every feature and get the best interview insights.
                            </p>
                        </div>

                        <div className="space-y-4 text-slate-300">

                            <div>
                                <h3 className="font-semibold text-cyan-400">
                                    📄 Step 1 — Resume Upload
                                </h3>

                                <p>
                                    Upload your resume PDF or paste resume content.
                                    InterviewLens extracts your skills,
                                    projects, technologies, and experience
                                    for evaluation.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-cyan-400">
                                    💼 Step 2 — Job Description
                                </h3>

                                <p>
                                    Paste the target job description.
                                    The AI compares your profile against
                                    recruiter requirements and identifies
                                    missing skills.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-cyan-400">
                                    🎤 Step 3 — Interview Q&A
                                </h3>

                                <p>
                                    Add interview questions and your answers.
                                    The AI evaluates answer quality,
                                    technical depth, communication,
                                    and relevance.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-cyan-400">
                                    🤖 Step 4 — AI Analysis
                                </h3>

                                <p>
                                    InterviewLens generates an Interview
                                    Readiness Score, strengths, weaknesses,
                                    skill gaps, and improvement suggestions.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-cyan-400">
                                    📈 Step 5 — Roadmap & Analytics
                                </h3>

                                <p>
                                    Receive a personalized 7-day roadmap
                                    and view historical performance trends
                                    through the Analytics Dashboard.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-cyan-400">
                                    🎯 Step 6 — Practice Questions
                                </h3>

                                <p>
                                    AI automatically generates interview
                                    questions and model answers to help
                                    strengthen weak areas.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-cyan-400">
                                    📄 Step 7 — PDF Reports
                                </h3>

                                <p>
                                    Download professional PDF reports
                                    containing scores, strengths,
                                    weaknesses, roadmap and interview
                                    recommendations.
                                </p>
                            </div>

                        </div>

                        <button
                            onClick={() => setShowGuide(false)}
                            className="
                            mt-6
                            bg-cyan-600
                            hover:bg-cyan-700
                            text-white
                            px-5
                            py-2
                            rounded-xl
                            font-medium
                            transition-all
                                        "
                        >
                            Close
                        </button>

                    </div>

                </div>
            )}
        </>
    );
}

export default Documentation;