
"use client"

import { createContext, useState } from "react";
export const SelectedPageContext = createContext(null);
export const SelectedPageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedPage, setSelectedPage] = useState("");
    return (
    <SelectedPageContext.Provider
      value ={{ selectedPage, setSelectedPage }}
    >
      {children}
    </SelectedPageContext.Provider>
  );
}