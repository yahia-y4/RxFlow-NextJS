"use client"
import "./suppliers.css"
import MyTable from "@/components/myTable/myTable";
import {useState} from "react"
export default function SuppliersPaymentsList() {
    const [PaymentsListData,setPaymentsListData] = useState([
           {id:1,Amount:1000,Date:"2023-01-01",Note:"دفعة اولى"},
        {id:2,Amount:2000,Date:"2023-02-01",Note:"دفعة ثانية"},
        {id:3,Amount:3000,Date:"2023-03-01",Note:"دفعة ثالثة"},
    ])
     const columns = [
        { key: "id", title: "ID" },
        { key: "Amount", title: "المبلغ المدفوع" },
        {key:"Date",title:"تاريخ الدفعة"},
        {key:"Note",title:"ملاحظة"} 
    ]
    return (
        <div className="Suppliers-payments-list">
            <h2> قائمة المدفوعات للمورد : {"فلان"}</h2>
            <div className="Suppliers-payments-list-table">
                <MyTable columns={columns} data={PaymentsListData}/>
            </div>
        </div>
    )
}