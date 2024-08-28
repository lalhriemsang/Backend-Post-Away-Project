import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
import OTPRepository from "./otp.repository.js";

export default class OTPController {
  constructor() {
    this.otpRepository = new OTPRepository();
  }
  async sendOTP(req, res) {
    try {
      const userId = req.userId;
      const { email } = req.body;
      const optNo = await this.otpRepository.generateOTP(userId);
      await this.sendEmail(email, optNo);
      res.status(200).send("OTP send successfully");
    } catch (error) {
      res.status(400).send("Internal Error");
    }
  }

  async verifyOTP(req, res) {
    try {
      const userId = req.userId;
      const { otpNo } = req.body;
      const verified = await this.otpRepository.verify(userId, Number(otpNo));

      if (!verified) return res.status(400).send("Incorrect Number");

      res.status(200).send("OTP verified");
    } catch (error) {
      res.status(400).send("Internal Error");
    }
  }

  async resetPassword(req, res) {
    try {
      const userId = req.userId;
      const { password } = req.body;
      const result = await this.otpRepository.resetPassword(userId, password);

      if (!result) return res.status(400).send("Please verify yourself first");

      res.status(200).send("Password reset successful");
    } catch (error) {
      res.status(400).send("Internal Error");
    }
  }

  async sendEmail(recipientMail, optNo) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.BOOK_MANAGER_EMAIL,
        pass: process.env.BOOK_MANAGER_PASSWD,
        // Use the App Password here
      },
    });
    const text = String(optNo);
    console.log(text);
    // console.log(
    //   process.env.BOOK_MANAGER_EMAIL,
    //   process.env.BOOK_MANAGER_PASSWD
    // );
    const mailOptions = {
      from: process.env.BOOK_MANAGER_EMAIL,
      to: recipientMail,
      subject: `OTP request generated`,
      text: text,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
    } catch (error) {
      console.log(error);
    }
  }
}
