import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const {
      title,
      introduction,
      sections,
      conclusion,
      tags
    } = req.body;

    // ✅ Validation
    if (!title || !introduction || !sections) {
      return res.status(400).json({
        error: "Missing required blog fields"
      });
    }

    // ✅ Get user from token (VERY IMPORTANT)
    const user = req.user; // comes from auth middleware

    // ✅ Create post
    const post = await Post.create({
      title,
      introduction,
      sections,
      conclusion,
      tags,

      author: user.id,
      authorName: user.name,
      // authorAvatar: user.avatar
    });

    res.status(201).json(post);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMyPosts = async (req, res) => {
  try {

      const posts = await Post.find({ author: req.user._id }).sort({ createdAt: -1 });

    // ✅ Send structured JSON response
    return res.status(200).json({
      success: true,
      count: posts.length,
      posts
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
      error: err.message
    });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.id });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};