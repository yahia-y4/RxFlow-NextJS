 "use client";
 import { createContext, useState} from 'react';

    export const SuccessContext = createContext(null)

    export function SuccessProvider({ children }: { children: React.ReactNode }) {
        const [isSuccess, setIsSuccess] = useState(false);
        const [successMessage, setSuccessMessage] = useState("");

        return (
            <SuccessContext.Provider value={{ isSuccess, setIsSuccess, successMessage, setSuccessMessage }}>
                {children}
            </SuccessContext.Provider>
        );
    }   