"use client";

import "./customers.css";
import MyTable from "@/components/myTable/myTable";
import MySearch from "@/components/mySearch/mySearch";
import { useContext, useEffect } from "react";
import { CustomersContext } from "@/app/customers/CustomersContext";
import { getAllCustomerApi } from "@/APIs/getAllCustomerApi";
import {getOneCustomerApi} from "@/APIs/getOneCustomerApi";
import{ErrorContext} from "@/app/globalsContext/errorContext"

export default function CustomersList() {
  // --------state & context-------- //
  const { setCustomersInfoVisible,selectedCustomer, setSelectedCustomer,ListCustomersData,setListCustomersData } = useContext(CustomersContext);
  const {setErrorCardMessage,setErrorCardVisible} = useContext(ErrorContext);
  const columns = [
    { key: "id", title: "ID" },
    { key: "name", title: "اسم الزبون" },
    { key: "phone_number", title: "رقم الهاتف" },
  ];
  //--------------------------------//


//-------effect to fetch customers data------//
useEffect(() => {
async function fetchCustomers() {
    const res = await getAllCustomerApi();
    if (res.success) {
      setListCustomersData(res.customers);
    } else {
      console.log("Failed to fetch customers");
    }
}
fetchCustomers();
}, []);
//------------------------------------------//
    


  //---------handle row click--------//
 async function handleRowClick(customer: object) {
    setCustomersInfoVisible(true);
    const result = await getOneCustomerApi(customer.id);
    if (result.success) {
        setSelectedCustomer(result.customer);
    }
    else{
        setErrorCardMessage(result.message);
        setErrorCardVisible(true);
    }

  }
  //---------------------------------//
  return (
    <div className="customers-list">
      <h2>قائمة الزبائن</h2>
      <MySearch />
      <div className="ListCustomers-table">
        <MyTable
          columns={columns}
          data={ListCustomersData}
          onRowClick={handleRowClick}
        ></MyTable>
      </div>
    </div>
  );
}
