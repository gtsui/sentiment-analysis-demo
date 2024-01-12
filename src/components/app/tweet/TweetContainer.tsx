import { toDateStr, toDateTimeStr } from "@/src/lib/dateUtils";
import { ITweet } from "@/src/types/types";
import { CardDark1, CardDark2 } from "../../common/card/Cards";

type Props = {
  tweet: ITweet;
};

const TweetContainer = ({ tweet }: Props) => {
  return (
    <>
      <CardDark1 className="flex flex-col p-6 gap-2">
        <div className="flex flex-row gap-2">
          <h4 className="text-primary-500">{tweet.username}</h4>
          <h4 className="text-contrast-low">{toDateTimeStr(tweet.ts)}</h4>
        </div>
        <CardDark2 className="flex p-6">
          <h4 className="text-contrast-high">{tweet.content}</h4>
        </CardDark2>
      </CardDark1>
    </>
  );
};

export default TweetContainer;
