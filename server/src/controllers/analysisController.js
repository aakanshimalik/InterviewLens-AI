import { analyzeInterview } from "../services/groqService.js";
import Interview from "../models/Interview.js";

export const analyze = async (req, res) => {
  try {
    console.log("BODY RECEIVED:");
    console.log(req.body);

    const result = await analyzeInterview(req.body);
    await Interview.create({
      user: req.user.id,
      jobDescription: req.body.jobDescription,
      resume: req.body.resume,

      score: result.score,
      probability: result.probability,

      strengths: result.strengths,
      weaknesses: result.weaknesses,
      missingSkills: result.missingSkills,
      mistakes: result.mistakes,

      roadmap: result.roadmap,

      practiceQuestions: result.practiceQuestions || [],
    });

    return res.status(200).json({
      success: true,
      analysis: result,
    });
  } catch (error) {
    console.error("ERROR:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
