import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    jobDescription: {
      type: String,
    },

    resume: {
      type: String,
    },

    score: {
      type: Number,
      default: 0,
    },

    probability: {
      type: String,
      default: "",
    },

    strengths: {
      type: [String],
      default: [],
    },

    weaknesses: {
      type: [String],
      default: [],
    },

    missingSkills: {
      type: [String],
      default: [],
    },

    mistakes: {
      type: [String],
      default: [],
    },

    roadmap: {
      type: Object,
      default: {},
    },
    practiceQuestions: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Interview = mongoose.model("Interview", interviewSchema);

export default Interview;