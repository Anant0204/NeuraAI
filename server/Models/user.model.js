import mongoose from "mongoose";

const pageSchema = new mongoose.Schema(
  {
    name: String,
    path: String,

    keywords: {
      type: [String],
      default: [],
    },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    assistantName: {
      type: String,
      default: "Neura",
    },
    businessName: {
      type: String,
      default: "Neura Inc.",
    },
    businessType: {
      type: String,
      default: "",
    },
    businessDescription: {
      type: String,
      default: "",
    },
    tone: {
      type: String,
      enum: ["Formal", "Friendly", "Professional", "Casual"],
      default: "Formal",
    },
    theme: {
      type: String,
      enum: ["dark", "ocean", "neon", "midnight" , "emerald", "glass"],
      default: "dark",
    },
    enableVoice: {
      type: Boolean,
      default: true,
    },
    pages: {
      type: [pageSchema],
      default: [],
    },
    enableNavigation: {
      type: Boolean,
      default: true,
    },
    geminiAPIKey: {
      type: String,
      default: "",
    },
    geminiStatus: {
      type: String,
      enum: ["active", "inactive", "quota_exceeded"],
      default: "inactive",
    },
    totalMessages: {
      type: Number,
      default: 0,
    },
    plan: {
      type: String,
      enum: ["free", "pro"],
      default: "free",
    },
    requestLimit: {
      type: Number,
      default: 200,
    },
    proExpiry: {
      type: Date,
      default: null,
    },
    isSetupComplete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
