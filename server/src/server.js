import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import analysisRoute from "./routes/analysisRoute.js";
import resumeRoute from "./routes/resumeRoute.js";
import connectDB from "./config/db.js";
import historyRoute from "./routes/historyRoute.js";
import analyticsRoute from "./routes/analyticsRoute.js";
import answerRoutes from "./routes/answerRoute.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();
connectDB();
const app = express();

app.use(cors({ origin: 'https://interviewlens-ai.netlify.app' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", analysisRoute);
app.use("/api", resumeRoute);
app.use("/api/history", historyRoute);
app.use("/api", analyticsRoute);
app.use("/api", answerRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("InterviewLens AI Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});