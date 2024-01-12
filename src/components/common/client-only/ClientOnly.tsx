"use client";

import type { ReactNode } from "react";
import { useHasMounted } from "@/src/hooks/useHasMounted";

// See: https://www.joshwcomeau.com/react/the-perils-of-rehydration/
const ClientOnly = ({ children }: { children: ReactNode }) => {
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
};

export default ClientOnly;
