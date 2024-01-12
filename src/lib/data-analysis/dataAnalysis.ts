import { ITweet } from "@/src/types/types";

export type MentionsByDate = {
  date: string;
  mentions: number;
};

export const getMentionsByDate = (startTs: number, tweets: ITweet[]) => {
  const groupedTweets = new Map<string, number>();

  // Initialize all dates between startDate and today with count 0
  let d = new Date(startTs * 1000);
  for (d; d <= new Date(); d.setDate(d.getDate() + 1)) {
    groupedTweets.set(d.toISOString().split("T")[0], 0);
  }

  tweets.forEach((tweet) => {
    // Convert ts to date string
    const date = new Date(tweet.ts * 1000).toISOString().split("T")[0];
    if (groupedTweets.has(date)) {
      const count = groupedTweets.get(date) || 0;
      groupedTweets.set(date, count + 1);
    }
  });

  const result: MentionsByDate[] = [];
  groupedTweets.forEach((mentions, date) => {
    result.push({ date, mentions });
  });
  return result;
};
