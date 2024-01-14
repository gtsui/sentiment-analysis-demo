import ClientOnly from "@/src/components/common/client-only/ClientOnly";
import TwitterGPT from "@/src/site-pages/twitter-gpt/TwitterGPT";

export default function Page() {
  return (
    <>
      <ClientOnly>
        <p className="text-contrast-high">Testing</p>
        <TwitterGPT />
      </ClientOnly>
    </>
  );
}
