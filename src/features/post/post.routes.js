import express from "express";
import PostController from "./post.controller.js";
import { upload } from "../../middlewares/fileUpload.middleware.js";

const postRouter = express.Router();
const postController = new PostController();

postRouter.get("/all", (req, res) => postController.getAllPosts(req, res));

postRouter.get("/:postId", (req, res) => postController.getPostById(req, res));

postRouter.get("/", (req, res) => postController.getUserPosts(req, res));

postRouter.post("/", upload.single("imageUrl"), (req, res) =>
  postController.addPost(req, res)
);

postRouter.put("/:postId", upload.single("imageUrl"), (req, res) =>
  postController.updatePost(req, res)
);

postRouter.delete("/:postId", (req, res) =>
  postController.deletePost(req, res)
);

export default postRouter;
