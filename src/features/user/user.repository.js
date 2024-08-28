import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { userSchema } from "./user.schema.js";

const userModel = mongoose.model("User", userSchema);

export class UserRepository {
  async register(userData) {
    try {
      const newUser = new userModel(userData);
      newUser.password = await bcrypt.hash(newUser.password, 12);
      await newUser.save();
      return newUser;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async findByEmail(email) {
    try {
      return await userModel.findOne({ email: email });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async logout(userId, jwtToken) {
    try {
      const user = await userModel.findById(userId);
      // user is present through jwtAuth
      const index = user.tokens.findIndex((token) => token == jwtToken);

      if (index >= 0) user.tokens.splice(index, 1);
      await user.save();
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async logoutAll(userId) {
    try {
      const user = await userModel.findById(userId);
      if (!user) throw new Error("User not Found");

      user.tokens = [];
      await user.save();
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getDetails(userId) {
    try {
      return await userModel.findById(userId).select("-password");
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getAllDetails() {
    try {
      return await userModel.find({}).select("-password");
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async updateDetails(userId, updates) {
    try {
      const user = await userModel.findById(userId).select("-password");

      if (!user) throw new Error("User not found");

      if (updates.hasOwnProperty("password")) {
        delete updates.password;
      }

      Object.assign(user, updates);
      await user.save();

      return user;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async passwordUpdate(userId, newPassword) {
    try {
      const user = await userModel.findById(userId);
      if (!user) return false;
      user.password = await bcrypt.hash(newPassword, 12);
      await user.save();
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
