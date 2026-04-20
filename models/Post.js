import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150
    },

    content: {
      type: String,
      required: true
    },

    tags: [
      {
        type: String,
        lowercase: true,
        trim: true
      }
    ],

    // 🔗 Reference to User (IMPORTANT)
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    // ⚡ Denormalized fields (for performance)
    authorName: {
      type: String
    },

    authorAvatar: {
      type: String
    },

    // Optional features
    likesCount: {
      type: Number,
      default: 0
    },

    commentsCount: {
      type: Number,
      default: 0
    },

    isPublished: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true // adds createdAt & updatedAt automatically
  }
);

// 🔍 Indexes for performance
postSchema.index({ createdAt: -1 });
postSchema.index({ tags: 1 });

export default mongoose.model("Post", postSchema);