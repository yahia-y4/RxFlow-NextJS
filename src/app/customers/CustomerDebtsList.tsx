
"use client"

import "./customers.css"
import MyTable from "@/components/myTable/myTable";
import { useState } from "react";
export default function CustomerDebtsList() {
    const [customerDebts,setCustomerDebts] = useState([
        {
            id:1,
            amount:1000,
            date:"2023-01-01",
            note:"معجون اسنان",
        },
        {
            id:2,
            amount:2000,
            date:"2023-02-01",
            note:"معجون طبي",
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
            <h2>قائمة ديون : {"فلان"}</h2>
            <div className="customer-debts-list-table">
                <MyTable columns={columns} data={customerDebts} />
            </div>
        </div>
    )
}