// routes/aiRoutes.js
import express from "express";
import { suggestIdeas } from "../controllers/aiController.js";

const router = express.Router();

router.get("/suggest", suggestIdeas);

export default router;