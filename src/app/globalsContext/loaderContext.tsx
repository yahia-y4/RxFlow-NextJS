
"use client";

import { createContext, useState } from "react";

export const LoaderContext = createContext(null);
export const LoaderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(false);
    return (
    <LoaderContext.Provider
      value ={{
        isLoading,
        setIsLoading
      }}>
      {children}
    </LoaderContext.Provider>
  );
}