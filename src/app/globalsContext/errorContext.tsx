"use client"
import { createContext, useState } from "react";
export const ErrorContext = createContext(null);
export const ErrorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [ErrorCardVisible, setErrorCardVisible] = useState(false);  
  const [ErrorCardMessage, setErrorCardMessage] = useState("");  
    return (
    <ErrorContext.Provider
      value ={{
        ErrorCardVisible,
        setErrorCardVisible,
        ErrorCardMessage,
        setErrorCardMessage
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
}
