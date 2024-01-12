import ViewProvider from "./ViewProvider";

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  // ==========================================================================
  // RENDER
  // ==========================================================================
  return <ViewProvider>{children}</ViewProvider>;
};

export default ContextProvider;
