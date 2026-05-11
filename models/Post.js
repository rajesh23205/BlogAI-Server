import mongoose from "mongoose";

// ✅ Subsection Schema
const subsectionSchema = new mongoose.Schema(
  {
    subheading: {
      type: String,
      trim: true
    },

    paragraph: {
      type: String,
      trim: true
    }
  },
  {
    _id: false
  }
);

// ✅ Section Schema
const sectionSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
      trim: true
    },

    paragraph: {
      type: String,
      required: true,
      trim: true
    },

    points: [
      {
        type: String,
        trim: true
      }
    ],

    subsections: [subsectionSchema]
  },
  {
    _id: false
  }
);

// ✅ Main Post Schema
const postSchema = new mongoose.Schema(
  {
    // H1
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150
    },

    // Introduction
    introduction: {
      type: String,
      required: true,
      trim: true
    },

    // Blog Sections
    sections: {
      type: [sectionSchema],
      required: true,
      validate: {
        validator: (value) => value.length >= 1,
        message: "At least one section is required"
      }
    },

    // Conclusion
    conclusion: {
      type: String,
      trim: true
    },

    // SEO Tags
    tags: [
      {
        type: String,
        lowercase: true,
        trim: true
      }
    ],

    // 🔗 Author Reference
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    // ⚡ Denormalized User Data
    authorName: {
      type: String,
      trim: true
    },

    authorAvatar: {
      type: String
    },

    // Optional Features
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
    timestamps: true
  }
);

// ✅ Indexes
postSchema.index({ createdAt: -1 });
postSchema.index({ tags: 1 });
postSchema.index({ title: "text" });

export default mongoose.model("Post", postSchema);