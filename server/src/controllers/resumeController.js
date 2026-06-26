import extractPdfText from "../utils/extractPdf.js";

export const uploadResume = async (req, res) => {

    try {

        const filePath = req.file.path;

        let extractedText = await extractPdfText(filePath);

        extractedText = extractedText.replace(/(?<=\w)\s(?=\w)/g, "");

        return res.status(200).json({
            success: true,
            extractedText
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            extractPdfText
        });
    }
};