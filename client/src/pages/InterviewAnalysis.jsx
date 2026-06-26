import { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import { downloadInterviewReport } from "../utils/pdfReport";
import Documentation from "../pages/Documentation";

function InterviewAnalysis() {
  const [resume, setResume] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [qaList, setQaList] = useState([
    {
      question: "",
      answer: "",
    },
  ]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [generatedAnswers, setGeneratedAnswers] =
    useState({});
  const [showGuide, setShowGuide] =useState(false);
  const resultRef = useRef(null);


  const handleResumeUpload = async () => {
    if (!resumeFile) {
      toast.warning("Please select a PDF first");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/upload-resume`,
        formData
      );

      setResume(
        response.data.extractedText ||
        response.data.text
      );
      console.log("Upload response:", response.data);
      toast.success("Resume uploaded successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Resume upload failed");
    }

    setUploading(false);
  };

  const handleAnalyze = async () => {
    setLoading(true);
    const questions = qaList
      .map((item, index) => `${index + 1}. ${item.question}`)
      .join("\n");

    const answers = qaList
      .map((item, index) => `${index + 1}. ${item.answer}`)
      .join("\n");
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/analyze`,
        {
          resume,
          jobDescription,
          questions,
          answers,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "Practice Questions:",
        response.data.analysis.practiceQuestions
      );

      setResult(response.data.analysis);
      toast.success("Interview Analyzed Successfully!");
      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Analysis Failed");
    }
  };

  const handleClear = () => {
    setResume("");
    setResumeFile(null);
    setJobDescription("");

    setQaList([
      {
        question: "",
        answer: "",
      },
    ]);

    setResult(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const downloadReport = () => {
    if (!result) return;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("InterviewLens AI Analysis Report", 20, 20);

    doc.setFontSize(12);

    doc.text(`Score: ${result.score}/100`, 20, 40);
    doc.text(
      `Pass Probability: ${result.probability}`,
      20,
      50
    );

    doc.text("Strengths:", 20, 70);
    result.strengths?.forEach((item, index) => {
      doc.text(
        `• ${item}`,
        25,
        80 + index * 10
      );
    });

    let y =
      90 +
      (result.strengths?.length || 0) * 10;

    doc.text("Weaknesses:", 20, y);
    result.weaknesses?.forEach((item, index) => {
      doc.text(
        `• ${item}`,
        25,
        y + 10 + index * 10
      );
    });

    doc.save("InterviewLensAI_Report.pdf");
  };

  const addQuestion = () => {
    setQaList([
      ...qaList,
      {
        question: "",
        answer: "",
      },
    ]);
  };

  const handleGenerateAnswer = async (
    question,
    index
  ) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/generate-answer`,
        {
          question,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setGeneratedAnswers((prev) => ({
        ...prev,
        [index]: response.data.answer,
      }));
    } catch (error) {
      console.log(error);
      toast.error("Failed to generate answer");
    }
  };

  return (
    <div className="relative min-h-[500px] bg-gradient-to-br from-[#08152e] via-[#0d244d] to-[#1a103d]">
      <div className="min-h-screen bg-[#071428] py-10">
        <div className="max-w-5xl mx-auto px-4">

          {/* HERO SECTION */}

          <div
            className="
  relative
  h-[600px]
  flex
  flex-col
  justify-center
  items-center
  text-center
  overflow-hidden
  "
          >

            {/* Background Overlay */}
            <div
              className="
    absolute inset-0
    bg-gradient-to-br
    from-[#071428]
    via-[#0b2046]
    to-[#170d3f]
    "
            />

            {/* Grid Effect */}
            <div
              className="
    absolute inset-0
    opacity-10
    bg-[linear-gradient(rgba(255,255,255,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.15)_1px,transparent_1px)]
    bg-[size:40px_40px]
    "
            />

            {/* Content */}

            <div className="relative z-10">

              <p
                className="
      text-cyan-300
      uppercase
      tracking-[5px]
      mb-5
      "
              >
                Welcome {localStorage.getItem("name")}
              </p>

              <h1
                className="
      text-white
      text-6xl
      md:text-7xl
      font-extralight
      mb-8
      "
              >
                AI Interview
                <br />
                Failure Analyzer
              </h1>

              <p
                className="
      text-slate-300
      text-xl
      max-w-4xl
      mx-auto
      leading-relaxed
      "
              >
                Discover why interviews fail, identify
                missing skills, uncover recruiter
                expectations and build a personalized
                roadmap to land your next job faster.
              </p>

            </div>

          </div>

          <div className="max-w-5xl mx-auto px-4 -mt-24 relative z-20">
            <div className="bg-slate-900/70
backdrop-blur-xl
border
border-cyan-500/20
rounded-3xl
shadow-2xl
p-8">
              <h3 className="text-slate-200 font-semibold text-lg mb-3">
                Upload Resume (PDF)
              </h3>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3">
                  <label className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-xl cursor-pointer">
                    Choose PDF
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) =>
                        setResumeFile(e.target.files[0])
                      }
                    />
                  </label>

                  <span className="text-slate-400 text-sm text-gray-600">
                    {resumeFile
                      ? resumeFile.name
                      : "No file selected"}
                  </span>

                  <button
                    onClick={handleResumeUpload}
                    disabled={uploading}
                    className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
                  >
                    {uploading
                      ? "Uploading..."
                      : "Upload Resume"}
                  </button>
                </div>
              </div>

              <div className="mb-10">

                <div className="flex items-center my-5">
                  <div className="flex-1 border-t border-gray-300"></div>

                  <span className="px-4 text-cyan-300 text-sm font-semibold uppercase">
                    OR
                  </span>

                  <div className="flex-1 border-t border-gray-300"></div>
                </div>

                <textarea
                  rows="5"
                  className="text-slate-200 w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
                  placeholder="Paste Resume"
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                />
              </div>

              <div className="text-slate-200 grid gap-4">


                <div>
                  <label className="text-slate-200 block mb-2 font-semibold ">
                    Job Description
                  </label>

                  <textarea
                    rows="5"
                    className="w-full
bg-slate-800
border
border-slate-700
rounded-xl
p-3
text-white
placeholder-slate-400
focus:outline-none
focus:border-cyan-500"
                    placeholder="Paste Job Description"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-slate-200">
                    Interview Questions & Answers
                  </label>

                  {qaList.map((item, index) => (
                    <div
                      key={index}
                      className="border
border-slate-700
rounded-xl
p-4
mb-4
bg-slate-800"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold text-lg text-white">
                          Question {index + 1}
                        </h3>

                        {qaList.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              const updated = qaList.filter(
                                (_, i) => i !== index
                              );
                              setQaList(updated);
                            }}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                          >
                            Delete
                          </button>
                        )}
                      </div>

                      <textarea
                        rows="2"
                        className="w-full
bg-slate-800
border
border-slate-700
rounded-xl
p-3
text-white
placeholder-slate-400
focus:outline-none
focus:border-cyan-500 mb-3"
                        placeholder="Enter Interview Question"
                        value={item.question}
                        onChange={(e) => {
                          const updated = [...qaList];
                          updated[index].question = e.target.value;
                          setQaList(updated);
                        }}
                      />

                      <textarea
                        rows="3"
                        className="w-full
bg-slate-800
border
border-slate-700
rounded-xl
p-3
text-white
placeholder-slate-400
focus:outline-none
focus:border-cyan-500"
                        placeholder="Enter Your Answer"
                        value={item.answer}
                        onChange={(e) => {
                          const updated = [...qaList];
                          updated[index].answer = e.target.value;
                          setQaList(updated);
                        }}
                      />
                    </div>
                  ))}


                  <button
                    type="button"
                    onClick={addQuestion}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                  >
                    + Add Another Question
                  </button>
                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="bg-cyan-600
hover:bg-cyan-700
text-white
py-3
rounded-xl
font-semibold text-white py-3 rounded-lg font-semibold disabled:bg-gray-400"

                >
                  {loading
                    ? "Analyzing Interview..."
                    : "Analyze Interview"}
                </button>

                <button
                  onClick={handleClear}
                  className="bg-slate-700 hover:bg-slate-600 text-white py-3 px-6 rounded-lg font-semibold mt-3"
                >
                  Clear Form
                </button>
              </div>
            </div>


            {/* Results */}
            {result && (
              <>
              <div ref={resultRef} className="mt-16 mb-8 text-center">
                <p className="text-cyan-400 uppercase tracking-[4px] text-sm mb-2">
                  Analysis Complete
                </p>

                <h2 className="text-4xl font-light text-white">
                  Interview Performance Report
                </h2>

                <p className="text-slate-400 mt-3">
                  AI-powered insights based on your resume, job description,
                  and interview responses.
                </p>
              </div>
                <div className="bg-slate-900/70 backdrop-blur-xl border border-cyan-500/20 p-6 rounded-2xl shadow-xl shadow-cyan-100/10 mt-8 text-center">
                  <h2 className="text-2xl font-bold mb-2 text-white">
                    Interview Readiness Score
                  </h2>

                  <p
                    className={`text-6xl font-bold ${result.score >= 75
                      ? "text-green-600"
                      : result.score >= 50
                        ? "text-yellow-500"
                        : "text-red-500"
                      }`}
                  >
                    {result.score}/100
                  </p>

                  <p className="text-xl mt-2 text-slate-300">
                    Pass Probability: <b>{result.probability}</b>
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mt-8">

                  <div className="bg-slate-900/70 backdrop-blur-xl border border-cyan-500/20 p-6 rounded-2xl shadow-xl">
                    <h2 className="font-bold text-green-600 mb-3 text-xl">
                      Strengths
                    </h2>

                    <ul className="list-disc ml-5 text-slate-300">
                      {result.strengths?.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-900/70 backdrop-blur-xl border border-cyan-500/20 p-6 rounded-2xl shadow-xl ">
                    <h2 className="font-bold text-red-600 mb-3 text-xl">
                      Weaknesses
                    </h2>

                    <ul className="list-disc ml-5 text-slate-300">
                      {result.weaknesses?.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-900/70 backdrop-blur-xl border border-cyan-500/20 p-6 rounded-2xl shadow-xl ">
                    <h2 className="font-bold text-yellow-600 mb-3 text-xl">
                      Missing Skills
                    </h2>

                    <ul className="list-disc ml-5 text-slate-300">
                      {result.missingSkills?.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-900/70 backdrop-blur-xl border border-cyan-500/20 p-6 rounded-2xl shadow-xl ">
                    <h2 className="font-bold text-purple-600 mb-3 text-xl">
                      Interview Mistakes
                    </h2>

                    <ul className="list-disc ml-5 text-slate-300">
                      {result.mistakes?.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-slate-900/70 backdrop-blur-xl border border-cyan-500/20 p-6 rounded-2xl shadow-xl mt-6">
                  <h2 className="font-bold text-blue-600 mb-4 text-xl">
                    7-Day Improvement Roadmap
                  </h2>

                  <ul className="space-y-2 text-slate-300">
                    <li><b>Day 1:</b> {result.roadmap?.day1}</li>
                    <li><b>Day 2:</b> {result.roadmap?.day2}</li>
                    <li><b>Day 3:</b> {result.roadmap?.day3}</li>
                    <li><b>Day 4:</b> {result.roadmap?.day4}</li>
                    <li><b>Day 5:</b> {result.roadmap?.day5}</li>
                    <li><b>Day 6:</b> {result.roadmap?.day6}</li>
                    <li><b>Day 7:</b> {result.roadmap?.day7}</li>
                  </ul>
                </div>

                {result.practiceQuestions?.length > 0 && (
                  <div className="bg-slate-900/70 backdrop-blur-xl border border-cyan-500/20 p-6 rounded-2xl shadow-xl mt-6">
                    <h2 className="font-bold text-indigo-600 mb-4 text-xl">
                      🎯 AI Practice Questions
                    </h2>

                    <div className="space-y-3">
                      {result.practiceQuestions.map((question, index) => (
                        <div
                          key={index}
                          className="p-4 bg-slate-800 border border-slate-700 rounded-xl"
                        >
                          <p className="font-semibold text-cyan-400">
                            Question {index + 1}
                          </p>

                          <p className="mt-2 text-slate-300">
                            {question}
                          </p>

                          <button
                            onClick={() =>
                              handleGenerateAnswer(question, index)
                            }
                            className="mt-3 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
                          >
                            Generate Model Answer
                          </button>

                          {generatedAnswers[index] && (
                            <div className="mt-4 p-4 bg-slate-800 border border-slate-700 rounded-xl">
                              <h4 className="font-semibold text-cyan-400 mb-2">
                                AI Model Answer
                              </h4>

                              <p className="text-slate-300 whitespace-pre-wrap">
                                {generatedAnswers[index]}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              
              </>
            )}
          </div>
          
        </div>
      </div>
      <Documentation/>
        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-3xl p-10 text-center mb-10">

  <h2 className="text-3xl text-white font-semibold mb-4">
    Ready to Improve Your Interview Performance?
  </h2>

  <p className="text-slate-300">
    Get instant AI-powered feedback and actionable insights.
  </p>

</div>
    </div>
  );
}

export default InterviewAnalysis;