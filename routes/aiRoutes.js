// routes/aiRoutes.js
import express from "express";
import { suggestIdeas, postContent } from "../controllers/aiController.js";
import { validatePostContent } from "../models/Ai.js";

const router = express.Router();

router.get("/suggest", suggestIdeas);
router.get("/contentSuggestion", validatePostContent, postContent);

export default router;