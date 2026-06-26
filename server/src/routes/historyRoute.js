import express from "express";
import {
  getHistory,
  deleteInterview,
} from "../controllers/historyController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getHistory
);

router.delete(
  "/:id",
  authMiddleware,
  deleteInterview
);

export default router;