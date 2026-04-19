import Profile from "../models/Profile.js";

export const createProfile = async (req, res) => {
  try {
    const Profile = await Profile.create(req.body);
    res.status(201).json(Profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProfile = async (req, res) => {
  const Profiles = await Profile.find().sort({ createdAt: -1 });
  res.json(Profiles);
};