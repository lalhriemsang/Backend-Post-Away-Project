import express from "express";
import FriendController from "./friend.controller.js";

const friendRouter = express.Router();
const friendController = new FriendController();

friendRouter.get("/get-friends/:userId", (req, res) =>
  friendController.getFriends(req, res)
);
friendRouter.get("/get-pending-requests", (req, res) =>
  friendController.getPendingRequests(req, res)
);
friendRouter.post("/toggle-friendship/:friendId", (req, res) =>
  friendController.toggleFriendShip(req, res)
);
friendRouter.post("/response-to-request/:friendId", (req, res) =>
  friendController.repsondFriendRequest(req, res)
);

export default friendRouter;
