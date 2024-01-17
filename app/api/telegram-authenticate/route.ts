import { NextRequest, NextResponse } from "next/server";
import { TelegramClient } from "telegram";

export const POST = async (req: NextRequest) => {
  const { phoneNumber } = await req.json();
};
