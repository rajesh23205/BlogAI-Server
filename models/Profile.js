import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  name: {
    type: String
  },

  bio: {
    type: String,
    default: ""
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  avatar: {
    type: String,
    default: ""
  },

  location: {
    type: String,
    default: ""
  },

  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String
  },

  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Profile", profileSchema);