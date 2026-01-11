"use client";

import "./storage.css";
import MyTable from "@/components/myTable/myTable";
import MySearch from "@/components/mySearch/mySearch";

export default function ItemsTable() {
  function onRowClick(row:object){
    console.log("row clicked ",row);
  }
  function onSearchf(value:string){
    console.log("searching for ",value);
  }
  function onCancelf(){
    console.log("cancelling search ");
  }

  const columns = [
  { key: "name", title: "الاسم" },
  { key: "company", title: "الشركة" },
  { key: "form", title: "الشكل" },
  { key: "price_sell", title: "سعر البيع" },
  { key: "concent", title: "التركيز" },
  { key: "quantity", title: "الكمية" }
];
const data = [
  {
    id: 1,
    name: "ترامادول",
    company: "شركة النيل",
    form: "اقراص",
    price_sell: 50,
    concent: "100mg",
    quantity: 200,

  },
  {
    id: 2,
    name: "ترامادول",
    company: "شركة النيل",
    form: "اقراص",
    price_sell: 50,
    concent: "100mg",
    quantity: 200,

  },

];
  return (
    <div className="itemsTableStorage"> 
     <MySearch onSearch={onSearchf} onCancel={onCancelf}></MySearch>
     <MyTable columns={columns} data={data} onRowClick={onRowClick}/>
    </div>
    );}