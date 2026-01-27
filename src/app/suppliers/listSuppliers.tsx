"use client"
import "./suppliers.css"
import MyTable from "@/components/myTable/myTable"
import MySearch from "@/components/mySearch/mySearch"
import { useState,useContext,useEffect } from "react"
import { SuppliersContext } from "@/app/suppliers/suppliersContext"
import {getSuppliersApi} from "@/APIs/getSuppliersApi"

export default function ListSuppliers() {
    const {setSelectedSupplierID,setSuppliersInfoVisible,Suppliers,setSuppliers} = useContext(SuppliersContext);
useEffect(()=>{

    async function fetchSuppliers(){
      const result = await getSuppliersApi();
      if(result.success){
        setSuppliers(result.suppliers);
      }else{
        console.log(result.message);
      }
    }
    fetchSuppliers();
},[])
    function handleRowClick(rowData:object){
        setSelectedSupplierID(rowData.id);
        setSuppliersInfoVisible(true);
    }
    const columns = [
        { key: "id", title: "ID" },
        { key: "name", title: "اسم المورد" },
        {key:"phone_number",title:"رقم الهاتف"} 
    ]
 
  return (
    <div className="List-Suppliers">
      <h2>قائمة الموردين</h2>
      <MySearch></MySearch>
      <div className="ListSuppliers-table">
        <MyTable columns={columns} data={Suppliers} onRowClick={handleRowClick}></MyTable>
      </div>

    </div>
  )
}