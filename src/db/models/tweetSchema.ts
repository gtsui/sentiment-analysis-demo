import mongoose from "mongoose";
import { ITweet } from "@/src/types/types";

const tweetSchema = new mongoose.Schema<ITweet>({
  ts: Number,
  username: String,
  author: String,
  content: String,
  isRetweet: Boolean,
});

const Tweet = mongoose.models.Tweet || mongoose.model("Tweet", tweetSchema);

export default Tweet;
