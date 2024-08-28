import FriendRpository from "./friend.repository.js";

export default class FriendController {
  constructor() {
    this.friendRpository = new FriendRpository();
  }
  async getFriends(req, res) {
    try {
      const userId = req.params.userId;
      const friends = await this.friendRpository.friends(userId);
      res.status(200).send(friends);
    } catch (error) {
      res.status(400).send("Internal Error");
    }
  }

  async getPendingRequests(req, res) {
    try {
      const userId = req.userId;
      const pendingRequests = await this.friendRpository.pendingRequests(
        userId
      );
      res.status(200).send(pendingRequests);
    } catch (error) {
      res.status(400).send("Internal Error");
    }
  }

  async toggleFriendShip(req, res) {
    try {
      const userId = req.userId;
      const friendId = req.params.friendId;
      const result = await this.friendRpository.toggleFriendship(
        userId,
        friendId
      );

      res.status(200).send(result);
    } catch (error) {
      res.status(400).send("Internal Error");
    }
  }

  async repsondFriendRequest(req, res) {
    try {
      const userId = req.userId;
      const friendId = req.params.friendId;
      const { response } = req.body;
      const result = await this.friendRpository.respondToRequest(
        userId,
        friendId,
        response
      );

      res.status(200).send(result);
    } catch (error) {
      res.status(400).send("Internal Error");
    }
  }
}
