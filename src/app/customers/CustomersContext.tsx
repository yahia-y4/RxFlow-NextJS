
"use client"

import {createContext,useState} from "react"

export const CustomersContext = createContext(null)

export const CustomersProvider = ({children}:{children:any}) => {
    const [CustomersInfoVisible,setCustomersInfoVisible] = useState(false);
    const [CustomerPaymentsReceivedListVisible,setCustomerPaymentsReceivedListVisible] = useState(false);
    const [CustomerDebtsListVisible,setCustomerDebtsListVisible] = useState(false);
    const [EditCustomerVisible,setEditCustomerVisible] = useState(false)
    const[selectedCustomer,setSelectedCustomer] = useState({});
    const [ListCustomersData,setListCustomersData] = useState([]);
    return(
        <CustomersContext.Provider value={{
            CustomersInfoVisible,setCustomersInfoVisible,
            CustomerPaymentsReceivedListVisible,setCustomerPaymentsReceivedListVisible,
            EditCustomerVisible,
            setEditCustomerVisible,
            CustomerDebtsListVisible,
            setCustomerDebtsListVisible,
            selectedCustomer,
            setSelectedCustomer,
            ListCustomersData,
            setListCustomersData

        }}>
            {children}
        </CustomersContext.Provider>
    )
}
    
