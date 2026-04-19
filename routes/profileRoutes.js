import express from 'express';
import { createProfile, getProfile, login } from "../controllers/profileController.js";

const router = express.Router()

router.post("/", createProfile);
router.get("/", getProfile);
router.post("/login", login)

export default router;