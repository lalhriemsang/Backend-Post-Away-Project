import mongoose from "mongoose";

export const otpSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  otpNo: {
    type: Number,
  },
  changePassword: {
    type: Boolean,
    default: false,
  },
});
