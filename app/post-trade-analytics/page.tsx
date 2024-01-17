import ClientOnly from "@/src/components/common/client-only/ClientOnly";
import PostTradeAnalytics from "@/src/site-pages/post-trade-analytics/PostTradeAnalytics";

export default function Page() {
  return (
    <>
      <ClientOnly>
        <PostTradeAnalytics />
      </ClientOnly>
    </>
  );
}
