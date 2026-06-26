import Groq from "groq-sdk";

export const analyzeInterview = async (data) => {
  console.log("DATA RECEIVED IN SERVICE:");
  console.log(data);

  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `
        Job Description:
        ${data.jobDescription}

        Resume:
        ${data.resume}

        Questions:
        ${data.questions}

        Answers:
        ${data.answers}

        Analyze the interview.

        Give an interview readiness score from 0-100.

        Calculate score using:
        - Resume relevance to job description
        - Quality of answers
        - Missing skills
        - Interview mistakes

        Only identify missing skills that are explicitly required in the job description but absent from the resume or interview answers.

        Do not invent skills.
        Do not assume requirements.

        Based on score:
        90-100 = Very High
        75-89 = High
        60-74 = Medium
        40-59 = Low
        0-39 = Very Low

        Generate 3 interview practice questions
        based on the candidate's weaknesses,
        missing skills, and job description.

        The questions should help the candidate
        improve future interview performance.

        Return ONLY valid JSON.
        Do not add explanations.
        Do not add markdown.
        Do not add code blocks.


      {
        "score": 0,
        "probability": "",
        "strengths": [],
        "weaknesses": [],
        "missingSkills": [],
        "mistakes": [],

        "practiceQuestions": [
          "",
          "",
          ""
        ],

        "roadmap": {
          "day1": "",
          "day2": "",
          "day3": "",
          "day4": "",
          "day5": "",
          "day6": "",
          "day7": ""
        }
      }
        `,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });
const result = completion.choices[0].message.content;

try {
  const jsonMatch = result.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    throw new Error("No JSON found");
  }

  return JSON.parse(jsonMatch[0]);
} catch (error) {
  console.log("JSON Parse Error:", error);

  return {
  score: 0,
  probability: "",
  strengths: [],
  weaknesses: [],
  missingSkills: [],
  mistakes: [],
  practiceQuestions: [],
  roadmap: {},
  rawResponse: result,
};
}
};