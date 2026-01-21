"use client"
import {CustomersProvider} from "@/app/customers/CustomersContext"
export default function CustomersLayout({children}:{children:ReactNode}){
    return(
       <CustomersProvider>
               {children}
        </CustomersProvider>
    )
}