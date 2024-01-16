import ClientOnly from "@/src/components/common/client-only/ClientOnly";
import TelegramScraper from "@/src/site-pages/telegram-scraper/TelegramScraper";

export default function Page() {
  return (
    <>
      <ClientOnly>
        <TelegramScraper />
      </ClientOnly>
    </>
  );
}
