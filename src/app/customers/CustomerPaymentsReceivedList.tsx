"use client"
import "./customers.css"

import MyTable from "@/components/myTable/myTable";
import { useState } from "react";
export default function CustomerPaymentsReceivedList() {
    const [customerPaymentsReceived,setCustomerPaymentsReceived] = useState([
        {
            id:1,
            amount:1000,
            date:"2023-01-01",
            note:"دفعة اولى",
        },
        {
            id:2,
            amount:2000,
            date:"2023-02-01",
            note:"",
        },
    ]);
    /* ===== الأعمدة ===== */
    const columns=[
        { key: "id", title: "id" },
        { key: "amount", title: "المبلغ" },
        { key: "date", title: "التاريخ" },
        {key:"note",title:"ملاحظة"},
    ];
    return (
        <div className="customer-debts-list">
            <h2>قائمة مدفوعات : {"فلان"}</h2>
            <div className="customer-debts-list-table">
                <MyTable columns={columns} data={customerPaymentsReceived} />
            </div>
        </div>
    )
}