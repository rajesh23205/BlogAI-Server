import express from 'express';
import { createPost, getMyPosts } from "../controllers/postController.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router()

router.post("/", protect, createPost);
router.get("/", protect, getMyPosts);

export default router;