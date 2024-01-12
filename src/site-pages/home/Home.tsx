"use client";

import { useState } from "react";
import { CardDark0 } from "@/src/components/common/card/Cards";
import Search from "@/src/components/common/input/Search";
import { ITweet } from "@/src/types/types";
import TweetContainer from "@/src/components/app/tweet/TweetContainer";
import {
  getMentionsByDate,
  MentionsByDate,
} from "@/src/lib/data-analysis/dataAnalysis";
import TimeSeriesChart from "@/src/components/app/chart/TimeSeriesChart";

const Home = () => {
  // ==========================================================================
  // STATE / HOOKS
  // ==========================================================================
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tweets, setTweets] = useState<ITweet[] | undefined>([]);

  let mentionsByDate: MentionsByDate[] = [];
  if (tweets) {
    mentionsByDate = getMentionsByDate(
      Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 30,
      tweets
    );
    console.log(mentionsByDate);
  }

  // ==========================================================================
  // FUNCTIONS / HANDLERS
  // ==========================================================================
  const onSearch = async (query: string) => {
    setIsLoading(true);
    const res = await fetch(`/api/find-tweets/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    // Parse the response body as JSON
    const data = (await res.json()) as ITweet[];
    setIsLoading(false);
    setTweets(data);
    return data;
  };

  // ==========================================================================
  // RENDER
  // ==========================================================================
  return (
    <div className="flex flex-col items-center mt-20">
      <CardDark0 className="flex flex-col w-full max-w-screen-2xl gap-2 p-6">
        <div className="w-[90vw] max-w-[600px] mb-10">
          <Search
            placeholder="Search Query"
            onSearch={onSearch}
            searchAfterDelay={1000}
          />
        </div>
        <div className="flex flex-col w-[90vw] max-w-[800px] place-self-center gap-2">
          <h2 className="text-h4 text-primary-500 place-self-center">
            Mentions Over Time
          </h2>
          {mentionsByDate.length > 0 && (
            <TimeSeriesChart
              xData={mentionsByDate.map((e) => e.date)}
              yData={mentionsByDate.map((e) => e.mentions)}
              label={"Mentions"}
            />
          )}
        </div>
        <h3 className="text-primary-500 text-h3 my-10">Mentions</h3>
        {isLoading && <p className="text-contrast-high">Loading...</p>}
        {tweets?.map((tweet, i) => (
          <TweetContainer key={`tweet-${tweet.username}-${i}`} tweet={tweet} />
        ))}
      </CardDark0>
    </div>
  );
};

export default Home;
