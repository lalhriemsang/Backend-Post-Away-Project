import mongoose from "mongoose";
import { LikeSchema } from "./like.schema.js";

const likeModel = mongoose.model("Like", LikeSchema);

export default class LikeRepository {
  async toggleLikePost(userId, postId) {
    try {
      const like = await likeModel.findOne({
        user: new mongoose.Types.ObjectId(userId),
        likeable: new mongoose.Types.ObjectId(postId),
        types: "Post",
      });

      if (like) {
        await likeModel.deleteOne({
          user: new mongoose.Types.ObjectId(userId),
          likeable: new mongoose.Types.ObjectId(postId),
          types: "Post",
        });
        return;
      }

      const newLike = new likeModel({
        user: new mongoose.Types.ObjectId(userId),
        likeable: new mongoose.Types.ObjectId(postId),
        types: "Post",
      });
      await newLike.save();
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async toggleLikeComment(userId, commentId) {
    try {
      const like = await likeModel.findOne({
        user: new mongoose.Types.ObjectId(userId),
        likeable: new mongoose.Types.ObjectId(commentId),
        types: "Comment",
      });

      if (like) {
        await likeModel.deleteOne({
          user: new mongoose.Types.ObjectId(userId),
          likeable: new mongoose.Types.ObjectId(commentId),
          types: "Comment",
        });
        return;
      }

      const newLike = new likeModel({
        user: new mongoose.Types.ObjectId(userId),
        likeable: new mongoose.Types.ObjectId(commentId),
        types: "Comment",
      });
      await newLike.save();
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  // id : postId/commentId
  async getLikes(id, type) {
    try {
      const likes = await likeModel
        .find({
          likeable: id,
          types: type,
        })
        .populate("user")
        .populate({ path: "likeable", model: type });

      return {
        count: likes ? likes.length : 0,
        likes: likes,
      };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
