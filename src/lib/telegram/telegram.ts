import { Api, TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import { NewMessage } from "telegram/events";
const input = require("input");

export const authenticate = async (): Promise<TelegramClient> => {
  // Replace these with your own api_id and api_hash
  const apiId = process.env.TELEGRAM_API_ID!;
  const apiHash = process.env.TELEGRAM_API_HASH!;

  console.log("Logging in to Telegram...");

  const client = new TelegramClient(
    new StringSession(""),
    parseInt(apiId),
    apiHash,
    {
      connectionRetries: 5,
    }
  );

  await client.start({
    phoneNumber: async () => await input.text("Please enter your number: "),
    password: async () => await input.text("Please enter your password: "),
    phoneCode: async () =>
      await input.text("Please enter the code you received: "),
    onError: (err) => console.log(err),
  });

  console.log("Connected to Telegram.");
  client.session.save();
  return client;
};

export const listGroups = async (client: TelegramClient) => {
  const dialogs = await client.getDialogs({});
  const groups = dialogs
    .filter((dialog) => dialog.isGroup || dialog.isChannel)
    .map((group) => ({
      id: group.id,
      title: group.title,
      type: group.isChannel ? "Channel" : "Group",
    }));
  console.log(groups);
};

export const getChatHistory = async (
  client: TelegramClient,
  groupId: number,
  limit: number = 100
) => {
  try {
    const messages = await client.getMessages(groupId, { limit });
    const msgList: Api.Message[] = [];
    messages.forEach((msg) => {
      msgList.push(msg);
    });
    return msgList;
  } catch (e) {
    console.log("Failed to fetch messages", e);
    return [];
  }
};
