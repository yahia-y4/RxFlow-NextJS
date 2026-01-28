"use client"
import "./suppliers.css"
import MyTable from "@/components/myTable/myTable"
import MySearch from "@/components/mySearch/mySearch"
import { useState,useContext,useEffect } from "react"
import { SuppliersContext } from "@/app/suppliers/suppliersContext"
import {getSuppliersApi} from "@/APIs/getSuppliersApi"

export default function ListSuppliers() {
  const [searchValue, setSearchValue] = useState("");
    const {setSelectedSupplierID,
      setSuppliersInfoVisible,
      Suppliers,
      setSuppliers,
      selectedSupplierID
    } = useContext(SuppliersContext);

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
    async function handleRowClick(rowData:object){
       await setSelectedSupplierID(rowData.id);
        setSuppliersInfoVisible(true);
    }
    const columns = [
        { key: "id", title: "ID" },
        { key: "name", title: "اسم المورد" },
        {key:"phone_number",title:"رقم الهاتف"} 
    ]
 


   //---------البحث -------------
   function onSearchf(value:string){
    setSearchValue(value);
    console.log("searching for ",value);
    const filteredSuppliers = Suppliers.filter((supplier:object)=>
      supplier.name.toLowerCase().includes(value.toLowerCase()) ||
      supplier.phone_number.toLowerCase().includes(value.toLowerCase())
    );
    setSuppliers(filteredSuppliers);

    } 

    function onCancelf(){
      // إعادة جلب جميع الموردين عند إلغاء البحث
      async function fetchSuppliers(){
        const result = await getSuppliersApi();
        if(result.success){
          setSuppliers(result.suppliers);
        }else{
          console.log(result.message);
        }
      setSearchValue("");
 
    }
  
       fetchSuppliers();
  }
  return (
    <div className="List-Suppliers">
      <h2>قائمة الموردين</h2>
      <MySearch onSearch={onSearchf} onCancel={onCancelf}></MySearch>
      <div className="ListSuppliers-table">
        <MyTable columns={columns} data={Suppliers} onRowClick={handleRowClick}></MyTable>
      </div>

    </div>
  )
}