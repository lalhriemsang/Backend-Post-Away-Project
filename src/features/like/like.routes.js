import express from "express";
import LikeController from "./like.controller.js";

const likeRouter = express.Router();
const likeController = new LikeController();

likeRouter.get("/:id", (req, res) => likeController.getLikes(req, res));
likeRouter.post("/toggle/:id", (req, res) =>
  likeController.toggleLike(req, res)
);

export default likeRouter;
