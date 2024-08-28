import mongoose from "mongoose";
const url = "mongodb://localhost:27017/postAwayProject-II";

export const connetUsingMongoose = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongodb connected using mongoose");
  } catch (error) {
    console.log("Error while connecting to mongodb");
    console.log(error);
  }
};
