import CommentRepository from "./comment.repository.js";

export default class CommentController {
  constructor() {
    this.commentRepository = new CommentRepository();
  }

  async getComments(req, res) {
    try {
      const postComments = await this.commentRepository.comments(
        req.params.postId
      );

      res.status(200).send(postComments);
    } catch (error) {
      res.status(400).send("Internal Error");
    }
  }

  async addComment(req, res) {
    try {
      const userId = req.userId;
      const postId = req.params.postId;
      const { comment } = req.body;

      const newComment = await this.commentRepository.add(
        userId,
        postId,
        comment
      );
      res.status(201).send(newComment);
    } catch (error) {
      res.status(500).send("Internal Error");
    }
  }

  async updateComment(req, res) {
    try {
      const commentId = req.params.commentId;
      const userId = req.userId;

      const { comment } = req.body;

      const updatedComment = await this.commentRepository.update(
        userId,
        commentId,
        comment
      );

      if (!updatedComment) return res.status(400).send("Incorrect Credentials");

      res.status(200).send(updatedComment);
    } catch (error) {
      res.status(500).send("Internal Error");
    }
  }

  async deleteComment(req, res) {
    try {
      const commentId = req.params.commentId;
      const userId = req.userId;

      const resp = await this.commentRepository.delete(userId, commentId);

      if (!resp) return res.status(400).send("Wrong Credentials");

      res.status(200).send("Post deleted successfully");
    } catch (error) {
      res.status(500).send("Internal Error");
    }
  }
}
