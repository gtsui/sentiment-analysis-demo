import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import ContextProvider from "@/src/providers/ContextProvider";
import Navbar from "@/src/components/app/navbar/Navbar";
import SideNav from "@/src/components/app/navbar/SideNav";
import Toast from "@/src/components/common/toast/Toast";
import "./globals.css";

const fontHeader = Exo_2({
  subsets: ["latin"],
  variable: "--font-header",
});

const fontBody = Exo_2({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "tsuigeo NextJS Boilerplate",
  description: "NextJS Boilerplate by @tsuigeo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${fontHeader.variable} ${fontBody.variable}`}>
        <NextTopLoader
          color={""}
          initialPosition={0.85}
          showSpinner={false}
          height={2}
        />
        <ContextProvider>
          <Navbar />
          <SideNav />
          {children}
          <Toast />
        </ContextProvider>
      </body>
    </html>
  );
}
