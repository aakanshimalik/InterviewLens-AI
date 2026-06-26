import jsPDF from "jspdf";

export const downloadInterviewReport = (interview) => {
  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(18);
  doc.text("InterviewLens AI Analysis Report", 20, y);

  y += 15;

  doc.setFontSize(12);

  doc.text(`Score: ${interview.score}/100`, 20, y);
  y += 10;

  doc.text(
    `Pass Probability: ${interview.probability}`,
    20,
    y
  );
  y += 15;

  doc.text("Strengths:", 20, y);
  y += 10;

  interview.strengths?.forEach((item) => {
    doc.text(`• ${item}`, 25, y);
    y += 8;
  });

  y += 5;

  doc.text("Weaknesses:", 20, y);
  y += 10;

  interview.weaknesses?.forEach((item) => {
    doc.text(`• ${item}`, 25, y);
    y += 8;
  });

  y += 5;

  doc.text("Missing Skills:", 20, y);
  y += 10;

  interview.missingSkills?.forEach((item) => {
    doc.text(`• ${item}`, 25, y);
    y += 8;
  });

  y += 5;

  doc.text("Interview Mistakes:", 20, y);
  y += 10;

  interview.mistakes?.forEach((item) => {
    doc.text(`• ${item}`, 25, y);
    y += 8;
  });

  y += 5;

  doc.text("7-Day Roadmap:", 20, y);
  y += 10;

  if (interview.roadmap) {
    Object.entries(interview.roadmap).forEach(
      ([day, task]) => {
        doc.text(
          `${day.toUpperCase()}: ${task}`,
          25,
          y
        );
        y += 8;
      }
    );
  }

  y += 10;

doc.text("Practice Questions:", 20, y);
y += 10;

if (
  interview.practiceQuestions &&
  interview.practiceQuestions.length > 0
) {
  interview.practiceQuestions.forEach(
    (question, index) => {
      const lines = doc.splitTextToSize(
        `${index + 1}. ${question}`,
        160
      );

      doc.text(lines, 25, y);

      y += lines.length * 7 + 5;

      // page overflow protection
      if (y > 260) {
        doc.addPage();
        y = 20;
      }
    }
  );
}

  doc.save("InterviewLensAI_Report.pdf");
};