import express from "express";
import OTPController from "./otp.controller.js";

const otpRouter = express.Router();

const otpController = new OTPController();

otpRouter.post("/send", (req, res) => otpController.sendOTP(req, res));
otpRouter.post("/verify", (req, res) => otpController.verifyOTP(req, res));
otpRouter.post("/reset-password", (req, res) =>
  otpController.resetPassword(req, res)
);

export default otpRouter;
