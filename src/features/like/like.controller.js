import LikeRepository from "./like.repository.js";

export default class LikeController {
  constructor() {
    this.likeRepository = new LikeRepository();
  }

  async toggleLike(req, res) {
    try {
      const { type } = req.body;
      const id = req.params.id;
      const userId = req.userId;

      if (type != "Post" && type != "Comment") {
        return res.status(400).send("Invalid Type");
      }

      if (type == "Post") {
        this.likeRepository.toggleLikePost(userId, id);
      } else {
        this.likeRepository.toggleLikeComment(userId, id);
      }
      res.status(200).send("Like toggled");
    } catch (error) {
      res.status(400).send("Internal Error");
    }
  }

  async getLikes(req, res) {
    try {
      const { id } = req.params;
      const { type } = req.query;
      // console.log(id, type);
      const likes = await this.likeRepository.getLikes(id, type);
      res.status(200).send(likes);
    } catch (error) {
      res.status(400).send("Internal Error");
    }
  }
}
