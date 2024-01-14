import { NextResponse } from "next/server";
import { connectDB } from "@/src/db/connect";
import UserModel from "@/src/db/models/userSchema";

export const GET = async () => {
  try {
    await connectDB();
    let users = await UserModel.find({}).sort({ username: 1 });
    return NextResponse.json(users);
  } catch (e: any) {
    return NextResponse.json([]);
  }
};
