import mongoose from "mongoose";

export const PostSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
