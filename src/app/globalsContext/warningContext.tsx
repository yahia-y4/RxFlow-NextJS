"use client"

import { createContext, useState } from "react";
export const WarningContext = createContext(null);
export const WarningProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [WarningCardVisible, setWarningCardVisible] = useState(false);  
  const [WarningCardMessage, setWarningCardMessage] = useState("رسالة تحذير");  
const [WarningFunction, setWarningFunction] = useState(() => () => {});
    return (
    <WarningContext.Provider
      value ={{
        WarningCardVisible,
        setWarningCardVisible,
        WarningCardMessage,
        setWarningCardMessage,
        WarningFunction,
        setWarningFunction,
      }}
    >
      {children}
    </WarningContext.Provider>
  );
}
