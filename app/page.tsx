import ClientOnly from "@/src/components/common/client-only/ClientOnly";
import Home from "@/src/site-pages/home/Home";

export default function Page() {
  return (
    <>
      <ClientOnly>
        <Home />
      </ClientOnly>
    </>
  );
}
