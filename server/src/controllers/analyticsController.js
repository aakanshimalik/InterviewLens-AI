import Interview from "../models/Interview.js";

export const getAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;

    const interviews = await Interview.find({
      user: userId,
    }).sort({ createdAt: 1 });

    const totalInterviews = interviews.length;

    const scores = interviews.map(
      (item) => item.score || 0
    );

    const averageScore =
      scores.length > 0
        ? (
            scores.reduce((a, b) => a + b, 0) /
            scores.length
          ).toFixed(1)
        : 0;

    const bestScore =
      scores.length > 0
        ? Math.max(...scores)
        : 0;

    const improvement =
      scores.length >= 2
        ? scores[scores.length - 1] - scores[0]
        : 0;

    const trendData = interviews.map((item, index) => ({
        interview: index + 1,
        score: item.score,
    }));

    res.status(200).json({
        success: true,
        totalInterviews,
        averageScore,
        bestScore,
        improvement,
        trendData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};