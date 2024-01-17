"use client";

import { useContext } from "react";
import { ViewContext } from "@/src/contexts/view";
import Hamburger from "@/src/assets/icons/ui/hamburger.svg";

const Navbar = () => {
  // ==========================================================================
  // STATE / HOOKS
  // ==========================================================================
  const { toggleSideNav } = useContext(ViewContext);

  // ==========================================================================
  // RENDER
  // ==========================================================================
  return (
    <>
      <nav className="fixed w-screen h-[60px] z-10 top-0 left-0 bg-neutral-800 xl:hidden">
        <div className="max-w-screen-xl h-full flex flex-wrap items-center justify-between mx-auto px-4">
          <div className="flex flex-row w-full items-center justify-end mr-4 gap-4 xl:hidden">
            <span className="sr-only">Open main menu</span>
            <div className="text-h4 text-primary-500">LOGO</div>
            <Hamburger
              onClick={() => toggleSideNav()}
              height={24}
              width={24}
              className="text-contrast-high"
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
