import express from "express";
import UserController from "./user.controller.js";
import { upload } from "../../middlewares/fileUpload.middleware.js";
import jwtAuth from "../../middlewares/jwtAuth.js";

const userRouter = express.Router();
const userController = new UserController();

userRouter.post("/signup", upload.single("avatarUrl"), (req, res, next) =>
  userController.signUp(req, res, next)
);
userRouter.post("/signin", (req, res) => userController.signIn(req, res));
userRouter.post("/logout", jwtAuth, (req, res) =>
  userController.logout(req, res)
);
userRouter.post("/logout-all-devices", jwtAuth, (req, res) =>
  userController.logoutAll(req, res)
);
userRouter.get("/get-details/:userId", jwtAuth, (req, res) =>
  userController.getDetails(req, res)
);
userRouter.get("/get-all-details", jwtAuth, (req, res) =>
  userController.getAllDetails(req, res)
);
userRouter.put("/update-details/:userId", jwtAuth, (req, res) =>
  userController.updateDetails(req, res)
);

export default userRouter;
