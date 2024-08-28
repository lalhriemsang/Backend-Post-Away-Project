import mongoose from "mongoose";
import { friendSchema } from "./friend.schema.js";

const friendModel = mongoose.model("Friend", friendSchema);

export default class FriendRepository {
  async friends(userId) {
    try {
      const friends = await friendModel.find({
        userId: userId,
      }); // user is always valid since userId = req.userId after jwtAuth

      return friends.filter((friend) => friend.status == "accepted");
    } catch (error) {
      console.error("Error fetching friends:", error);
      throw new Error(error.message);
    }
  }

  async pendingRequests(userId) {
    try {
      const friends = await friendModel.find({
        userId: userId,
      });

      return friends.filter((friend) => friend.status == "pending");
    } catch (error) {
      console.error("Error fetching pending requests:", error);
      throw new Error(error.message);
    }
  }

  async toggleFriendship(userId, friendId) {
    try {
      const existingFriendship = await friendModel.findOne({
        userId,
        friendId,
      });

      if (existingFriendship) {
        await friendModel.deleteOne({ _id: existingFriendship._id });
        return { status: "friendship removed" };
      } else {
        const newFriendRequest = new friendModel({ userId, friendId });
        await newFriendRequest.save();
        return { status: "friendship requested" };
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async respondToRequest(userId, friendId, response) {
    try {
      const friendRequest = await friendModel.findOne({
        userId: userId,
        friendId: friendId,
        status: "pending",
      });

      console.log(friendRequest);
      if (!friendRequest) {
        throw new Error("Friend request not found.");
      }
      if (response === "accept") {
        friendRequest.status = "accepted";
      } else if (response === "reject") {
        friendRequest.status = "rejected";
      } else {
        throw new Error("Invalid response.");
      }

      await friendRequest.save();
      return { status: friendRequest.status };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
