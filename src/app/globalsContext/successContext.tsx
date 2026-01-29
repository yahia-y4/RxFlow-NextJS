 "use client";
 import { createContext, useState} from 'react';

    export const SuccessContext = createContext(null)

    export function SuccessProvider({ children }: { children: React.ReactNode }) {
        const [isSuccess, setIsSuccess] = useState(true);

        return (
            <SuccessContext.Provider value={{ isSuccess, setIsSuccess }}>
                {children}
            </SuccessContext.Provider>
        );
    }   