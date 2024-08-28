import { UserRepository } from "./user.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async signUp(req, res) {
    try {
      const userData = req.body;
      userData.avatarUrl = req.file.filename;
      const user = await this.userRepository.register(userData);
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send("Internal Error");
    }
  }

  async signIn(req, res) {
    try {
      const { email, password } = req.body;

      const user = await this.userRepository.findByEmail(email);
      console.log(user);

      if (!user) {
        return res.status(400).send("Incorrect credentials");
      } else {
        const result = await bcrypt.compare(password, user.password);

        if (result) {
          // 3. Create token
          // console.log("JWT_SECRET: xyz");
          const token = jwt.sign(
            { userID: user._id, email: user.email },
            "xyz",
            { expiresIn: "1h" }
          );

          user.tokens.push(token);
          await user.save();
          // 4. send token
          res.cookie("jwtToken", token, {
            expiresIn: "1h",
            httpOnly: false,
            secure: false,
          });
          res.cookie("userTokens", JSON.stringify(user.tokens), {
            expiresIn: "1h",
            httpOnly: false,
            secure: false,
          });

          // console.log(token);
          res.status(200).send(token);
        } else res.status(400).send("Invalid Credentials");
      }
    } catch (error) {
      res.status(400).send("Internal Error");
    }
  }

  async logout(req, res) {
    try {
      // console.log(req.cookies.jwtToken);
      const jwtToken = req.cookies.jwtToken;
      await this.userRepository.logout(req.userId, jwtToken);
      res.clearCookie("jwtToken");
      res.status(200).send("Logged out successfully");
    } catch (error) {
      res.status(400).send("Internal Error");
    }
  }

  async logoutAll(req, res) {
    try {
      await this.userRepository.logoutAll(req.userId);
      res.clearCookie("jwtToken");
      res.status(200).send("Logged out from all devices");
    } catch (error) {
      res.status(400).send("Internal Error");
    }
  }

  async getDetails(req, res) {
    try {
      const userId = req.params.userId;
      const user = await this.userRepository.getDetails(userId);
      if (!user) return res.status(400).send("User not found");

      res.status(200).send(user);
    } catch (error) {
      res.status(400).send("Internal Error");
    }
  }

  async getAllDetails(req, res) {
    try {
      const allUsersDetails = await this.userRepository.getAllDetails();

      res.status(200).send(allUsersDetails);
    } catch (error) {
      res.status(400).send("Internal Error");
    }
  }

  async updateDetails(req, res) {
    try {
      const userId = req.params.userId;
      const updates = req.body;
      const status = updates.password ? "Password updation not allowed" : "OK";
      const user = await this.userRepository.updateDetails(userId, updates);

      res.status(200).send({ user, status });
    } catch (error) {
      res.status(400).send("Internal Error");
    }
  }
}
