import Groq from "groq-sdk";

export const generateAnswer = async (req, res) => {
  try {
    const { question } = req.body;

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const completion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `
            Give a professional interview answer.

            Question:
            ${question}

            Keep answer concise.
            150-250 words.
            `,
          },
        ],
        model: "llama-3.3-70b-versatile",
      });

    return res.json({
      success: true,
      answer:
        completion.choices[0].message.content,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};