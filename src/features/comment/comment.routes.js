import express from "express";
import CommentController from "./comment.controller.js";

const commentRouter = express.Router();
const commentController = new CommentController();

commentRouter.get("/:postId", (req, res) =>
  commentController.getComments(req, res)
);
commentRouter.post("/:postId", (req, res) =>
  commentController.addComment(req, res)
);
commentRouter.put("/:commentId", (req, res) =>
  commentController.updateComment(req, res)
);
commentRouter.delete("/:commentId", (req, res) =>
  commentController.deleteComment(req, res)
);

export default commentRouter;
