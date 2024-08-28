import PostRepository from "./post.repository.js";

export default class PostController {
  constructor() {
    this.postRepository = new PostRepository();
  }
  async addPost(req, res) {
    try {
      const data = req.body;
      data.imageUrl = req.file.filename;
      data.user = req.userId;

      const newPost = await this.postRepository.add(data);
      res.status(201).send(newPost);
    } catch (error) {
      res.status(400).send("Internal Error");
    }
  }
  async updatePost(req, res) {
    try {
      const postId = req.params.postId;
      const userId = req.userId;
      const updates = req.body;

      if (req.file?.filename) updates.imageUrl = req.file.filename;

      const updatedPost = await this.postRepository.update(
        postId,
        userId,
        updates
      );

      if (!updatedPost) return res.status(400).send("Incorrect Credentials");

      res.status(200).send(updatedPost);
    } catch (error) {
      res.status(400).send("Internal Error");
    }
  }

  async deletePost(req, res) {
    try {
      const postId = req.params.postId;
      const userId = req.userId;

      const resp = await this.postRepository.delete(postId, userId);

      if (!resp) return res.status(400).send("Wrong Credentials");

      res.status(200).send("Post deleted successfully");
    } catch (error) {
      res.status(400).send("Internal Error");
    }
  }

  async getAllPosts(req, res) {
    try {
      const allPosts = await this.postRepository.findAllPosts();

      res.status(200).send(allPosts);
    } catch (error) {
      res.status(400).send("Internal Error");
    }
  }

  async getPostById(req, res) {
    try {
      const post = await this.postRepository.findPostById(req.params.postId);
      res.status(200).send(post);
    } catch (error) {
      res.status(400).send("Internal Error");
    }
  }

  async getUserPosts(req, res) {
    try {
      const userPosts = await this.postRepository.findUserPosts(req.userId);
      res.status(200).send(userPosts);
    } catch (error) {
      res.status(400).send("Internal Error");
    }
  }
}
