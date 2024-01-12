import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/db/connect";
import TweetModel from "@/src/db/models/tweetSchema";

export const POST = async (req: NextRequest) => {
  const { query } = await req.json();

  if (query.length === 0) {
    return NextResponse.json([]);
  }

  try {
    await connectDB();
    let results = await TweetModel.find({
      content: { $regex: query, $options: "i" },
    });
    return NextResponse.json(results);
  } catch (e) {
    return NextResponse.json([]);
  }
};
