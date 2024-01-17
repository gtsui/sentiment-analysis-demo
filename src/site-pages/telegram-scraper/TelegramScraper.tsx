import { CardDark0 } from "@/src/components/common/card/Cards";
import Authenticate from "./components/Authenticate";

const TelegramScraper = () => {
  return (
    <div className="flex flex-col items-center">
      <CardDark0 className="flex flex-col w-[95vw] max-w-screen-lg gap-2 p-6 mt-20">
        <div className="flex flex-col gap-0">
          <p className="text-contrast-high">
            This dashboard will allow you to privately scrape your Telegram
            group chat histories to analyze key data trends.
          </p>
          <p className="text-contrast-high">
            Let&apos;s start by entering your phone number connected to your
            Telegram handle to import your chat histories.
          </p>
        </div>
        <Authenticate />
      </CardDark0>
    </div>
  );
};

export default TelegramScraper;
