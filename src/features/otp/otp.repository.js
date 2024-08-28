import mongoose from "mongoose";
import { otpSchema } from "./otp.schema.js";
import { UserRepository } from "../user/user.repository.js";

const otpModel = mongoose.model("OTP", otpSchema);
export default class OTPRepository {
  async generateOTP(userId) {
    try {
      const otpCreated = await otpModel.findOne({
        user: userId,
      });

      const otpNo = Math.floor(1000000 + Math.random() * 9000000);

      if (!otpCreated) {
        const otp = otpModel({
          user: userId,
          optNo: otpNo,
        });
        await otp.save();
      } else {
        otpCreated.otpNo = otpNo;
        await otpCreated.save();
      }

      return otpNo;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async verify(userId, otpNo) {
    try {
      const result = await otpModel.findOne({
        user: userId,
      });

      console.log(result, userId, otpNo);
      if (!result && result.otpNo != otpNo) return false;

      result.changePassword = true;
      await result.save();
      return true;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async resetPassword(userId, newPassword) {
    try {
      const otp = await otpModel.findOne({
        user: userId,
        changePassword: true,
      });

      if (!otp) return false;

      otp.changePassword = false;
      await otp.save();

      const userRepository = new UserRepository();
      return userRepository.passwordUpdate(userId, newPassword);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
