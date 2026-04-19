import express from 'express';
import { createProfile, getMyProfile, login } from "../controllers/profileController.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router()

router.post("/", createProfile);
router.get("/", protect, getMyProfile);
router.post("/login", login)

export default router;