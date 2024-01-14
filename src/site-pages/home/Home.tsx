"use client";

import { useState } from "react";
import { CardDark0 } from "@/src/components/common/card/Cards";
import { ITweet, IUser } from "@/src/types/types";
import TweetContainer from "@/src/components/app/tweet/TweetContainer";
import {
  getMentionsByDate,
  MentionsByDate,
} from "@/src/lib/data-analysis/dataAnalysis";
import TimeSeriesChart from "./components/TimeSeriesChart";
import QueryForm from "./components/QueryForm";
import { Loading } from "@/src/components/common/loading/Loading";

const Home = () => {
  // ==========================================================================
  // STATE / HOOKS
  // ==========================================================================
  const [keyword, setKeyword] = useState<string>("");
  const [userFilter, setUserFilter] = useState<IUser[]>([]);
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let mentionsByDate: MentionsByDate[] = [];
  if (tweets) {
    mentionsByDate = getMentionsByDate(
      Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 30,
      tweets
    );
  }

  // ==========================================================================
  // FUNCTIONS / HANDLERS
  // ==========================================================================
  const runQueryHandler = async (keyword: string, userFilter: IUser[]) => {
    setIsLoading(true);
    const res = await fetch(`/api/find-tweets/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keyword, userFilter }),
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
    <div className="flex flex-col items-center">
      <CardDark0 className="flex flex-col w-[95vw] max-w-screen-lg gap-2 p-6 mt-20">
        <div className="flex flex-col w-[90vw] max-w-[600px] mb-10 gap-2 place-self-center md:place-self-start">
          <QueryForm
            keyword={keyword}
            setKeyword={setKeyword}
            userFilter={userFilter}
            setUserFilter={setUserFilter}
            runQueryHandler={runQueryHandler}
            isLoading={isLoading}
          />
        </div>
        <div className="flex flex-col w-[90vw] max-w-[800px] place-self-center gap-2">
          <h4 className="text-h4 text-primary-500 place-self-center">
            Mentions Over Time
          </h4>
          {mentionsByDate.length > 0 && (
            <TimeSeriesChart
              xData={mentionsByDate.map((e) => e.date)}
              yData={mentionsByDate.map((e) => e.mentions)}
              label={"Mentions"}
            />
          )}
        </div>
        <h4 className="text-primary-500 text-h4 mt-10">Mentions</h4>
        {isLoading && <Loading size={24} />}
        {tweets?.map((tweet, i) => (
          <TweetContainer
            key={`tweet-${tweet.username}-${i}`}
            tweet={tweet}
            keyword={keyword}
          />
        ))}
      </CardDark0>
    </div>
  );
};

export default Home;
