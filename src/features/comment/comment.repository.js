import mongoose from "mongoose";
import { commentSchema } from "./comment.schema.js";

const commentModel = mongoose.model("Comment", commentSchema);

export default class CommentRepository {
  async comments(postId) {
    try {
      return await commentModel.find({
        post: new mongoose.Types.ObjectId(postId),
      });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async add(userId, postId, comment) {
    try {
      const newComment = new commentModel({
        comment: comment,
        post: new mongoose.Types.ObjectId(postId),
        user: new mongoose.Types.ObjectId(userId),
      });
      await newComment.save();
      return newComment;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async update(userId, commentId, newComment) {
    try {
      const commentFound = await commentModel.findOne({
        _id: new mongoose.Types.ObjectId(commentId),
        user: new mongoose.Types.ObjectId(userId),
      });

      // console.log(commentId, userId);
      if (!commentFound) return false;

      commentFound.comment = newComment;
      await commentFound.save();

      return commentFound;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async delete(userId, commentId) {
    try {
      const result = await commentModel.deleteOne({
        _id: new mongoose.Types.ObjectId(commentId),
        user: new mongoose.Types.ObjectId(userId),
      });

      return result.deletedCount > 0;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
