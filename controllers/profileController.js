import Profile from "../models/Profile.js";
import jwt from "jsonwebtoken"; // You'll need to install this: npm install jsonwebtoken

export const createProfile = async (req, res) => {

  try {
    console.log('0');
    const profile = await Profile.create(req.body);
    console.log('1');
    // Convert to object and remove password before sending response
    const profileResponse = profile.toObject();
    console.log('2');
    delete profileResponse.password;
    console.log('3');
    res.status(201).json(profileResponse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    // Added .select("-password") so hashes aren't sent in bulk requests
    const profiles = await Profile.find().select("-password").sort({ createdAt: -1 });
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if user exists
    const user = await Profile.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 2. Compare passwords
    // We use the comparePassword method we defined in the Profile Model
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3. Generate a JWT (Token)
    // Replace 'YOUR_SECRET_KEY' with a long string in your .env file
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "1d" }
    );

    // 4. Send response (excluding password)
    const userData = user.toObject();
    delete userData.password;

    res.status(200).json({
      message: "Login successful",
      token,
      user: userData
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};