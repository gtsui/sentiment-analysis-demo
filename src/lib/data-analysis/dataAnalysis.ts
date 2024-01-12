import { ITweet } from "@/src/types/types";
import { toDateObj, toDateStr } from "../dateUtils";

export type MentionsByDate = {
  date: string;
  mentions: number;
};

export const getMentionsByDate = (startTs: number, tweets: ITweet[]) => {
  const groupedTweets = new Map<string, number>();

  // Initialize all dates between startDate and today with count 0
  let d = toDateObj(startTs);
  for (d; d <= new Date(); d.setDate(d.getDate() + 1)) {
    groupedTweets.set(d.toISOString().split("T")[0], 0);
  }

  tweets.forEach((tweet) => {
    // Convert ts to date string
    const dateStr = toDateStr(tweet.ts);
    if (groupedTweets.has(dateStr)) {
      const count = groupedTweets.get(dateStr) || 0;
      groupedTweets.set(dateStr, count + 1);
    }
  });

  const result: MentionsByDate[] = [];
  groupedTweets.forEach((mentions, date) => {
    result.push({ date, mentions });
  });
  return result;
};

export const maFilter = (data: number[], n: number): number[] => {
  n = Math.min(n, data.length);
  return data.map((_, index) => {
    if (index < n) {
      return data[index]; // For the first n elements, return the element itself
    } else {
      // Calculate the average of the previous n elements
      let sum = 0;
      for (let i = index - n; i < index; i++) {
        sum += data[i];
      }
      return sum / n;
    }
  });
};
