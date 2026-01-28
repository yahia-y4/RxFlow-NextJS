"use client"

import "./customers.css"
import CustomersForm from "./CustomersForm"
import CustomersList from "./CustomersList"
import CustomersInfo from "./CustomersInfo"
import CustomerDebtsList from "./CustomerDebtsList"
import CustomerPaymentsReceivedList from "./CustomerPaymentsReceivedList"
import EditCustomer from "./EditCustomer"
import {CustomersContext} from "@/app/customers/CustomersContext"
import{SelectedPageContext} from "@/app/globalsContext/selectedPageContext"

import { useContext, useEffect } from "react"

export default function Customers() {

    const {setSelectedPage}=useContext(SelectedPageContext);
  
  useEffect(()=>{
    setSelectedPage("الزبائن");
  },[])


  const {
    CustomersInfoVisible,
    CustomerPaymentsReceivedListVisible,
    EditCustomerVisible,
     CustomerDebtsListVisible}=useContext(CustomersContext)
  return (
    <div className="Customers-page">

        <CustomersForm/>
        {!CustomerPaymentsReceivedListVisible && !CustomerDebtsListVisible && <CustomersList/>}
        {CustomersInfoVisible && <CustomersInfo/>}
      {CustomersInfoVisible && CustomerDebtsListVisible &&  <CustomerDebtsList/>}
        {CustomersInfoVisible && CustomerPaymentsReceivedListVisible && <CustomerPaymentsReceivedList/> }
         {EditCustomerVisible && <EditCustomer/> }
   
    </div>
  )
}
