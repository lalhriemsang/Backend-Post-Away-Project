import cookieParser from "cookie-parser";
import express from "express";
import bodyParser from "body-parser";
import swagger from "swagger-ui-express";
import cors from "cors";
import apiDocs from "./swagger.json" assert { type: "json" };
import jwtAuth from "./src/middlewares/jwtAuth.js";
import userRouter from "./src/features/user/user.routes.js";
import postRouter from "./src/features/post/post.routes.js";
import commentRouter from "./src/features/comment/comment.routes.js";
import likeRouter from "./src/features/like/like.routes.js";
import friendRouter from "./src/features/friend/friend.routes.js";
import otpRouter from "./src/features/otp/otp.routes.js";
import { connetUsingMongoose } from "./src/config/mongooseConfig.js";

const server = express();
// const corOptions = {
//   origin: "http://127.0.0.1:5500",
// };
// server.use(cors(corOptions));

server.use(cookieParser());
server.use(bodyParser.json());
server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));
server.use("/api/user", userRouter);
server.use("/api/posts", jwtAuth, postRouter);
server.use("/api/comments", jwtAuth, commentRouter);
server.use("/api/likes", jwtAuth, likeRouter);
server.use("/api/friends", jwtAuth, friendRouter);
server.use("/api/otp", jwtAuth, otpRouter);

server.listen(3000, () => {
  console.log("Server is listening at port 3200");
  // connectToMongoDB();
  connetUsingMongoose();
});
