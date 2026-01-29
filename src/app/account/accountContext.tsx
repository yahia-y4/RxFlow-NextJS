"use client"
import{ createContext,useState } from "react";
export const AccountContext = createContext(null);
export function AccountProvider({children}:{children:React.ReactNode}) {
    const [isLogin, setIsLogin] = useState(false);
    return(
        <AccountContext.Provider value={{isLogin,setIsLogin}}>
            {children}
        </AccountContext.Provider>
    )
}