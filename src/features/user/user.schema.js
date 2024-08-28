import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unqiue: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  password: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
  },
  tokens: [
    {
      type: String,
    },
  ],
});
