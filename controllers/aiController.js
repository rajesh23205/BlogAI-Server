import { suggestPostIdeas, suggestPostContent } from "../services/aiService.js";

export const suggestIdeas = async (req, res) => {
  const { topic } = req.query;

  const ideas = await suggestPostIdeas(topic);
  res.json(ideas);
};

export const postContent = async (req, res) => {
  const { title } = req.query;
  const ideas = await suggestPostContent(title);
  res.json(ideas);
};