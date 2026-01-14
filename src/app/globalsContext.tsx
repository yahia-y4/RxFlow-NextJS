import { createContext, useState } from "react";

export const GlobalsContext = createContext(null);
export const GlobalsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [someGlobalState, setSomeGlobalState] = useState(false);    
    return (
    <GlobalsContext.Provider
      value ={{}}
    >
      {children}
    </GlobalsContext.Provider>
  );
}