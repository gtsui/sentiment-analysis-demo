import { createContext } from "react";

export type Context = {
  isSideNavOpen: boolean;
  toggleSideNav: (value?: boolean) => void;
};

export const ViewContext = createContext<Context>({
  isSideNavOpen: false,
  toggleSideNav: () => {},
});
