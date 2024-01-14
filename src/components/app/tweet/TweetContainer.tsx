import Image from "next/image";
import { toDateTimeStr } from "@/src/lib/dateUtils";
import { ITweet } from "@/src/types/types";
import { CardDark1, CardDark2 } from "../../common/card/Cards";
import NewWindow from "@/src/assets/icons/ui/new_window.svg";
import { useMemo } from "react";

type Props = {
  tweet: ITweet;
  keyword: string;
};

const TweetContainer = ({ tweet, keyword }: Props) => {
  // ==========================================================================
  // STATE / HOOKS
  // ==========================================================================
  const content = useMemo(() => {
    const regex = new RegExp(
      `(?<![A-Za-z0-9])(${keyword})(?![A-Za-z0-9])`,
      "gi"
    );
    const parts = tweet.content.split(regex);
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === keyword.toLowerCase() ? (
            <span
              key={i}
              style={{ backgroundColor: "#9dd44f", color: "#121212" }}
            >
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  }, []);

  // ==========================================================================
  // RENDER
  // ==========================================================================
  return (
    <>
      <CardDark1 className="flex flex-col p-6 gap-2">
        <div className="flex flex-row gap-2 items-center">
          <h4 className="text-primary-500">{tweet.username}</h4>
          <h4 className="text-contrast-low">{toDateTimeStr(tweet.ts)}</h4>
          <a
            href={`https://www.twitter.com${tweet.url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <NewWindow
              className="text-contrast-medium"
              alt=""
              height={12}
              width={12}
            />
          </a>
        </div>
        <CardDark2 className="flex p-6">
          <p className="text-contrast-high text-p2">{content}</p>
        </CardDark2>
      </CardDark1>
    </>
  );
};

export default TweetContainer;
