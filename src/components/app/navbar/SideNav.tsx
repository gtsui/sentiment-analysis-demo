"use client";

import Link from "next/link";
import { useContext } from "react";
import { ViewContext } from "@/src/contexts/view";

const SideNav = () => {
  // ==========================================================================
  // STATE / HOOKS
  // ==========================================================================
  const { isSideNavOpen, toggleSideNav } = useContext(ViewContext);

  // ==========================================================================
  // RENDER
  // ==========================================================================
  return (
    <>
      {/* Shadow overlay */}
      <div
        className={`${
          isSideNavOpen ? "block" : "hidden"
        } fixed w-full h-screen z-10 bg-[rgba(0,0,0,.4)] lg:hidden`.trim()}
        onClick={() => toggleSideNav()}
      />

      {/* Sidebar Object */}
      <div
        className={`${
          !isSideNavOpen && "-ml-[254px] lg:ml-[0]"
        } flex flex-col justify-between fixed w-[254px] h-[100vh] z-20 overflow-auto
         bg-neutral-800 border-r border-r-neutral-700 transition-all`.trim()}
      >
        <div className="flex flex-col mt-4 ml-6 gap-4 text-contrast-high text-sh5">
          {/* Logo */}
          <div className="text-h4 text-primary-500 mb-4">LOGO</div>
          {/* Nav Links */}
          <div className="flex flex-col gap-2">
            <h4 className="text-sh4 text-primary-500 font-bold">Dashboards</h4>
            <div className="flex flex-col">
              <Link
                className="rounded-md p-1 hover:bg-primary-500 hover:text-neutral-900"
                onClick={() => toggleSideNav()}
                href="/"
              >
                <div className="ml-2">Twitter Mentions</div>
              </Link>
              <Link
                className="rounded-md p-1 hover:bg-primary-500 hover:text-neutral-900"
                onClick={() => toggleSideNav()}
                href="/telegram-scraper"
              >
                <div className="ml-2">Telegram Scraper</div>
              </Link>
              <Link
                className="rounded-md p-1 hover:bg-primary-500 hover:text-neutral-900"
                onClick={() => toggleSideNav()}
                href="/twitterGPT"
              >
                <div className="ml-2">TwitterGPT</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNav;
