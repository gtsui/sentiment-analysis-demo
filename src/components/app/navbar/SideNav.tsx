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
        } fixed lg:hidden w-full h-screen z-10 bg-[rgba(0,0,0,.4)]`.trim()}
        onClick={() => toggleSideNav()}
      />

      {/* Sidebar Object */}
      <div
        className={`${
          !isSideNavOpen && "-ml-[254px]"
        } flex flex-col justify-between fixed lg:hidden w-[254px] h-[100vh] z-20 overflow-auto
         bg-neutral-800 border-r border-r-neutral-700 transition-all`.trim()}
      >
        <div className="flex flex-col mt-4 ml-6 gap-4 text-contrast-high text-sh5 lg:hidden">
          {/* Logo */}
          <div className="text-h4 text-primary-500 mb-4">LOGO</div>
          {/* Nav Links */}
          <Link onClick={() => toggleSideNav()} href="/">
            <div>Link 1</div>
          </Link>
          <Link onClick={() => toggleSideNav()} href="/">
            <div>Link 2</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideNav;
