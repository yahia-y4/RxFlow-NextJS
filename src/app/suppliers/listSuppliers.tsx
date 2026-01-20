"use client"
import "./suppliers.css"
import MyTable from "@/components/myTable/myTable"
import MySearch from "@/components/mySearch/mySearch"
import { useState,useContext } from "react"
import { SuppliersContext } from "@/app/suppliers/suppliersContext"
export default function ListSuppliers() {
    const {setSelectedSupplier,setSuppliersInfoVisible} = useContext(SuppliersContext);
    function handleRowClick(rowData:any){
        setSelectedSupplier(rowData);
        setSuppliersInfoVisible(true);
     console.log(rowData)
    }
    const columns = [
        { key: "id", title: "ID" },
        { key: "name", title: "اسم المورد" },
        {key:"num",title:"رقم الهاتف"} 
    ]
    const [ListSuppliersData,setListSuppliersData] = useState([
        {id:1,name:"مورد 1",num:"123456789"},
        {id:2,name:"مورد 2",num:"987654321"},
        {id:3,name:"مورد 3",num:"456789123"},
    ])
  return (
    <div className="List-Suppliers">
      <h2>قائمة الموردين</h2>
      <MySearch></MySearch>
      <div className="ListSuppliers-table">
        <MyTable columns={columns} data={ListSuppliersData} onRowClick={handleRowClick}></MyTable>
      </div>

    </div>
  )
}