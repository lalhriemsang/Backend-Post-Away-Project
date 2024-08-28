import mongoose from "mongoose";
import { PostSchema } from "./post.schema.js";

const postModel = mongoose.model("Post", PostSchema);

export default class PostRepository {
  async add(post) {
    try {
      const newPost = new postModel(post);
      await newPost.save();
      return newPost;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async update(postId, userId, updates) {
    try {
      const post = await postModel.findOne({
        _id: new mongoose.Types.ObjectId(postId),
        user: new mongoose.Types.ObjectId(userId),
      });
      console.log(postId, userId);

      if (!post) return false;

      Object.assign(post, updates);
      await post.save();
      return post;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async delete(postId, userId) {
    try {
      const result = await postModel.deleteOne({
        _id: new mongoose.Types.ObjectId(postId),
        user: new mongoose.Types.ObjectId(userId),
      });

      return result.deletedCount > 0;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async findAllPosts() {
    try {
      return await postModel.find({});
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async findPostById(postId) {
    try {
      return await postModel.findById(postId);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async findUserPosts(userId) {
    try {
      return await postModel.find({
        user: new mongoose.Types.ObjectId(userId),
      });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
