"use client";

import "./storage.css";
import MyTable from "@/components/myTable/myTable";
import MySearch from "@/components/mySearch/mySearch";
import { StorageContext } from "./storageContext"
import { useContext } from "react"
import { useState } from "react";
import { useEffect } from "react";
import { getAllItemsApi } from "@/APIs/getAllItemsApi";
import { getOneItemApi } from "@/APIs/getOneItemApi";

export default function ItemsTable() {
  const [searchValue, setSearchValue] = useState("");

  const {addInvoiceVisible,
    setItemInfoVisible,
    storageItems,
    setStorageItems,
    selectedItem,
    setSelectedItem,
    InvoiceData,
    setInvoiceData
    ,tempItemsInvoice,
    setTempItemsInvoice}
     = useContext(StorageContext)

  // --------- جلب البيانات من API -------------
useEffect(()=>{
  async function fetchItems(){
    const response = await getAllItemsApi();

    if(response.success){
      setStorageItems(response.items);
    }
  }
  fetchItems();
},[])

  async function onRowClick(row:object){
    if(!addInvoiceVisible){
      console.log("row clicked ",row);
      const response = await getOneItemApi(row.id);
      if(response.success){
    
       setSelectedItem(response.data);
       
      }
      setItemInfoVisible(true);
       
       
    }else{
      const exists = InvoiceData.items.some(
  (item) => item.id === row.id
);

if (exists) {
  // موجود مسبقًا → لا تضف
  return;
}

// غير موجود → أضف
setInvoiceData((prev) => ({
  ...prev,
  items: [
    ...prev.items,
    { id: row.id, quantity: 1, price: row.price_buy },
  ],
}));

setTempItemsInvoice((prev) => [
  ...prev,
  {
    id: row.id,
    name: row.name,
    company: row.company,
    form: row.form,
    quantity: 1,
    price: row.price_buy,
  },
]);
    }

   
  }
  function onSearchf(value:string){
    console.log("searching for ",value);
    setSearchValue(value);
    const filteredItems = storageItems.filter((item:object)=>
      item.name.toLowerCase().includes(value.toLowerCase()) ||
      item.company.toLowerCase().includes(value.toLowerCase()) ||
      item.form.toLowerCase().includes(value.toLowerCase())
      );
      setStorageItems(filteredItems);
  }
  function onCancelf(){
  
    setSearchValue("");
    async function fetchItems(){
      const response = await getAllItemsApi();
      if(response.success){
        setStorageItems(response.items);
      }}
    fetchItems();
  }

  const columns = [
    { key: "id", title: "ID" },
    { key: "name", title: "الاسم" },
    { key: "company", title: "الشركة" },
    { key: "form", title: "الشكل" },
    { key: "sell_price", title: "سعر البيع" },
    { key: "concent", title: "التركيز" },
    { key: "titer", title: "العيار" },
    { key: "package_type", title: "العبوة" },
    { key: "quantity", title: "الكمية" }
];
   


  return (
    <div className="itemsTableStorage"> 

     <MySearch onSearch={onSearchf} onCancel={onCancelf}></MySearch>
     <MyTable columns={columns} data={storageItems} onRowClick={onRowClick}/>
    </div>
    );}