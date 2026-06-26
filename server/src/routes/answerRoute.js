import express from "express";
import { generateAnswer } from "../controllers/answerController.js";

const router = express.Router();

router.post("/generate-answer", generateAnswer);

export default router;