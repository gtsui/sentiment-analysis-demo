import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/db/connect";
import TweetModel from "@/src/db/models/tweetSchema";
import { ITweet, IUser } from "@/src/types/types";

export const POST = async (req: NextRequest) => {
  const { keyword, userFilter } = await req.json();

  if (keyword.length === 0) {
    return NextResponse.json([]);
  }

  try {
    await connectDB();

    let query: any = {
      content: { $regex: keyword, $options: "i" },
    };

    if (userFilter && userFilter.length > 0) {
      query["username"] = {
        $in: userFilter.map((u: IUser) => u.username),
      };
    }

    let results = (await TweetModel.find(query)) as ITweet[];
    results.sort((a, b) => {
      return b.ts - a.ts;
    });
    return NextResponse.json(results);
  } catch (e) {
    return NextResponse.json([]);
  }
};
