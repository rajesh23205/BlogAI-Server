import { suggestPostIdeas } from "../services/aiService.js";

export const suggestIdeas = async (req, res) => {
  const { topic } = req.query;

  const ideas = await suggestPostIdeas(topic);
  res.json(ideas);
};