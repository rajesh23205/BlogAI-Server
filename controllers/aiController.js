import { suggestPostIdeas, suggestPostContent } from "../services/aiService.js";

export const suggestIdeas = async (req, res) => {
  const { topic } = req.query;

  const ideas = await suggestPostIdeas(topic);
  res.json(ideas);
};

export const postContent = async (req, res) => {
  try {
    const { title } = req.query;

    const ideas = await suggestPostContent(title);

    res.json({
      type: "success",
      data: ideas
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ type: "error", message: error.message });
  }
};