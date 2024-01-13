import Image from "next/image";
import { toDateTimeStr } from "@/src/lib/dateUtils";
import { ITweet } from "@/src/types/types";
import { CardDark1, CardDark2 } from "../../common/card/Cards";
import NewWindow from "@/src/assets/icons/ui/new_window.svg";

type Props = {
  tweet: ITweet;
};

const TweetContainer = ({ tweet }: Props) => {
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
          <p className="text-contrast-high text-p2">{tweet.content}</p>
        </CardDark2>
      </CardDark1>
    </>
  );
};

export default TweetContainer;
