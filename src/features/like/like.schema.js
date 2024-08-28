import mongoose from "mongoose";

export const LikeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likeable: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "types",
    required: true,
  },
  types: {
    type: String,
    enum: ["Post", "Comment"],
    required: true,
  },
});
