import { useEffect, useState } from "react";
import axios from "axios";
import { downloadInterviewReport } from "../utils/pdfReport";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

function History() {
  const [interviews, setInterviews] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [generatedAnswers, setGeneratedAnswers] = useState({});
const [loadingQuestion, setLoadingQuestion] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

const response = await axios.get(
  "http://localhost:5000/api/history",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      setInterviews(response.data.interviews);
    } catch (error) {
      console.log(error);
    }
  };

  if (interviews.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">
          Interview History
        </h1>

        <div className="text-center py-10">
  <h2 className="text-2xl font-bold text-gray-700">
    No Interviews Yet
  </h2>

  <p className="text-gray-500 mt-2">
    Analyze your first interview to start building history.
  </p>
</div>
      </div>
    );
  }

  const generateAnswer = async (question) => {
  try {
    setLoadingQuestion(question);

    const token = localStorage.getItem("token");

    const response = await axios.post(
      "http://localhost:5000/api/generate-answer",
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
      [question]: response.data.answer,
    }));
  } catch (error) {
    console.log(error);
  }

  setLoadingQuestion("");
};

const handleDelete = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/history/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setInterviews((prev) =>
      prev.filter((item) => item._id !== id)
    );
  } catch (error) {
    console.log(error);
  }
};

const confirmDelete = (id) => {
  toast(
    ({ closeToast }) => (
      <div>
        <p className="mb-3">
          Delete this interview permanently?
        </p>

        <div className="flex gap-2">
          <button
            className="bg-red-600 text-white px-3 py-1 rounded"
            onClick={() => {
              handleDelete(id);
              closeToast();
            }}
          >
            Delete
          </button>

          <button
            className="bg-gray-400 text-white px-3 py-1 rounded"
            onClick={closeToast}
          >
            Cancel
          </button>
        </div>
      </div>
    ),
    {
      autoClose: false,
      closeOnClick: false,
    }
  );
};

  return (
    <div className="min-h-screen bg-[#071428] pt-24 px-6">
      <div className="text-center mb-12">
      <p className="text-cyan-400 uppercase tracking-[4px] mb-3">
        Performance Archive
      </p>

      <h1 className="text-5xl font-light text-white mb-4">
        Interview History
      </h1>

      <p className="text-slate-400">
        Total Analyses: {interviews.length}
      </p>
    </div>

      {interviews.map((item) => (
        <div
          key={item._id}
          className="bg-slate-900/70 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6 mb-6 shadow-xl"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5">
            <div>
              <p className="text-slate-400 text-sm mb-2">
                <b>Interview Readiness Score</b>
              </p>
              <h2
                className={`text-4xl font-bold ${
                  item.score >= 80
                    ? "text-green-400"
                    : item.score >= 60
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {item.score}/100
              </h2>

              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
                  item.probability === "Very High"
                    ? "bg-green-100 text-green-700"
                    : item.probability === "High"
                    ? "bg-blue-100 text-blue-700"
                    : item.probability === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {item.probability}
              </span>

              <p className="mt-2 text-gray-500 text-sm">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 md:gap-3">
  <button
    className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 text-sm md:text-base rounded-xl font-medium transition"
    onClick={() =>
      setSelectedId(
        selectedId === item._id
          ? null
          : item._id
      )
    }
  >
    {selectedId === item._id
      ? "Hide Details"
      : "View Details"}
  </button>

  <button
    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-sm md:text-base rounded-xl font-medium transition"
    onClick={() =>
      downloadInterviewReport(item)
    }
  >
    📄 Download PDF
  </button>

    <button
    onClick={() => confirmDelete(item._id)}
    className="text-red-400 hover:text-red-300 transition"
  >
    <FaTrash size={18} />
  </button>
  </div>
          </div>

          {selectedId === item._id && (
            <div className="mt-6 border-t border-slate-700 pt-6">
              <div className="grid md:grid-cols-2 gap-4">

              <div className="bg-slate-800/70 backdrop-blur-md rounded-2xl p-5 border border-slate-700/50 hover:border-cyan-500/20 transition">
                <h3 className="font-bold text-green-400 text-lg">
                  ✅ Strengths
                </h3>

                <ul className="list-disc ml-6 text-slate-300 space-y-2">
                  {item.strengths?.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-800/70 backdrop-blur-md rounded-2xl p-5 border border-slate-700/50 hover:border-cyan-500/20 transition">
                <h3 className="font-bold text-yellow-400 text-lg">
                  ⚠ Weaknesses
                </h3>

                <ul className="list-disc ml-6 text-slate-300 space-y-2">
                  {item.weaknesses?.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-800/70 backdrop-blur-md rounded-2xl p-5 border border-slate-700/50 hover:border-cyan-500/20 transition">
                <h3 className="font-bold text-cyan-400 text-lg">
                  🎯 Missing Skills
                </h3>

                <ul className="list-disc ml-6 text-slate-300 space-y-2">
                  {item.missingSkills?.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-800/70 backdrop-blur-md rounded-2xl p-5 border border-slate-700/50 hover:border-cyan-500/20 transition">
                <h3 className="font-bold text-red-400 text-lg">
                  ❌ Interview Mistakes
                </h3>

                <ul className="list-disc ml-6 text-slate-300 space-y-2">
                  {item.mistakes?.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
              </div>

              <div className="border-t border-slate-700 my-6"></div>

              <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 mb-4">
  <h3 className="font-bold text-cyan-400 text-xl mb-4">
    🎯 Practice Questions
  </h3>

  {item.practiceQuestions?.length > 0 ? (
    <div className="space-y-4">
      {item.practiceQuestions.map((question, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 bg-slate-800/70 backdrop-blur-md rounded-2xl"
        >
          <p className="font-medium mb-3 text-slate-200">
            {index + 1}. {question}
          </p>

          <button
            onClick={() =>
              generateAnswer(question)
            }
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
          >
            {loadingQuestion === question
              ? "Generating..."
              : "Generate AI Answer"}
          </button>

          {generatedAnswers[question] && (
            <div className="mt-4 p-3 bg-slate-900/90 backdrop-blur-md rounded-2xl border rounded">
              <h4 className="font-semibold text-green-400 mb-2">
                AI Answer
              </h4>

              <p className="text-slate-300 whitespace-pre-wrap">
                {generatedAnswers[question]}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500">
      No practice questions available.
    </p>
  )}
</div>

            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default History;