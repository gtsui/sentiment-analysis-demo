"use client";

import { useState, ReactNode } from "react";
import { ViewContext } from "../contexts/view";

const ViewProvider = ({ children }: { children: ReactNode }) => {
  const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(false);
  const toggleSideNav = (value?: boolean) => {
    setIsSideNavOpen(value ?? !isSideNavOpen);
  };

  return (
    <ViewContext.Provider
      value={{
        isSideNavOpen,
        toggleSideNav,
      }}
    >
      {children}
    </ViewContext.Provider>
  );
};

export default ViewProvider;
