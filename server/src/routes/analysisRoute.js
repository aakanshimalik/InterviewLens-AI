import express from "express";
import { analyze } from "../controllers/analysisController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/analyze",authMiddleware, analyze);

export default router;