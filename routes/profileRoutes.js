import express from 'express';
import { createProfile, getProfile } from "../controllers/profileController.js";

const router = express.Router()

router.post("/", createProfile);
router.get("/", getProfile);

export default router;