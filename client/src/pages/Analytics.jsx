import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Analytics() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/analytics"
      );

      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!stats) return <h2>Loading...</h2>;

  return (
    <div className="min-h-screen bg-[#071428] pt-24 px-6">
      <div className="text-center mb-12">

        <p className="text-cyan-400 uppercase tracking-[4px] mb-3">
          Performance Insights
        </p>

        <h1 className="text-5xl font-light text-white mb-4">
          Analytics Dashboard
        </h1>

        <p className="text-slate-400">
          Track your interview growth and readiness
        </p>

      </div>

      <div className="grid md:grid-cols-4 gap-5 mb-10">

        <div className="bg-slate-900/70 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 shadow-xl">
          <h2 className="text-slate-400">
            Total Interviews
          </h2>

          <p className="text-4xl font-bold text-white mt-2">
            {stats.totalInterviews}
          </p>
        </div>

        <div className="bg-slate-900/70 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 shadow-xl">
          <h2 className="text-slate-400">
            Average Score
          </h2>

          <p className="text-4xl font-bold text-cyan-400 mt-2">
            {stats.averageScore}
          </p>
        </div>

        <div className="bg-slate-900/70 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 shadow-xl">
          <h2 className="text-slate-400">
            Best Score
          </h2>

          <p className="text-4xl font-bold text-green-400 mt-2">
            {stats.bestScore}
          </p>
        </div>

        <div className="bg-slate-900/70 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 shadow-xl">
          <h2 className="text-slate-400">
            Improvement
          </h2>

          <p className="text-4xl font-bold text-indigo-400 mt-2">
            {stats.improvement}
          </p>
        </div>

      </div>

      <div className=" bg-slate-900/70 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 shadow-xl mt-10">
      <h2 className="text-3xl font-light text-white mb-6">
        Interview Score Trend
      </h2>

  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={stats.trendData}>
      <CartesianGrid
        stroke="#334155"
        strokeDasharray="3 3"
      />

      <XAxis
        dataKey="interview"
        stroke="#94A3B8"
      />

      <YAxis
        stroke="#94A3B8"
      />

      <Tooltip
        contentStyle={{
          backgroundColor: "#0F172A",
          border: "1px solid #06B6D4",
          borderRadius: "12px",
          color: "#fff",
        }}
      />

      <Line
        type="monotone"
        dataKey="score"
        stroke="#06B6D4"
        strokeWidth={4}
        dot={{
          fill: "#06B6D4",
          r: 6,
        }}
      />
    </LineChart>
  </ResponsiveContainer>
</div>
<div className="grid md:grid-cols-2 gap-6 mt-10">

  <div className="
    bg-slate-900/70
    backdrop-blur-xl
    border border-cyan-500/20
    rounded-2xl
    p-6
  ">
    <h3 className="text-white text-xl mb-3">
      Performance Summary
    </h3>

    <p className="text-slate-400">
      Your strongest performance reached
      {` ${stats.bestScore}/100 `}
      and your current average score is
      {` ${stats.averageScore}/100`}.
    </p>
  </div>

  <div className="
    bg-slate-900/70
    backdrop-blur-xl
    border border-cyan-500/20
    rounded-2xl
    p-6
  ">
    <h3 className="text-white text-xl mb-3">
      AI Recommendation
    </h3>

    <p className="text-slate-400">
      Continue practicing weak areas and
      focus on communication, technical
      depth, and recruiter expectations.
    </p>
  </div>

</div>
    </div>
    
  );
}

export default Analytics;