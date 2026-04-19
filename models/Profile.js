import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const profileSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  bio: { type: String, default: "" },
  avatar: { type: String, default: "" },
  location: { type: String, default: "" },
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  createdAt: { type: Date, default: Date.now }
});

// --- NEW CODE: Password Hashing ---
// Profile.js

profileSchema.pre("save", async function () {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return;

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // Notice: No next() call here
  } catch (err) {
    // If you throw an error inside an async pre-save, 
    // Mongoose catches it and passes it to your controller
    throw new Error(err); 
  }
});

// Helper to check password validity (useful for login)
profileSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;