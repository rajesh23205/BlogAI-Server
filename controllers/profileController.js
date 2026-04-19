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

// profileController.js

export const getMyProfile = async (req, res) => {
  try {
    // req.user was set by the 'protect' middleware
    const profile = await Profile.findById(req.user.id).select("-password");
    
    if (profile) {
      res.json(profile);
    } else {
      res.status(404).json({ message: "Profile not found" });
    }
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