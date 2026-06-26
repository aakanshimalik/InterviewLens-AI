import fs from "fs";
import { PdfReader } from "pdfreader";

const extractPdfText = (filePath) => {
  return new Promise((resolve, reject) => {
    let text = "";

    new PdfReader().parseFileItems(filePath, (err, item) => {
      if (err) {
        reject(err);
      } else if (!item) {
        resolve(text);
      } else if (item.text) {
        text += item.text + " ";
      }
    });
  });
};

export default extractPdfText;