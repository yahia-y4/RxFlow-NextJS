
"use client"

import "./customers.css"
import MyTable from "@/components/myTable/myTable";
import { useState,useEffect } from "react";
import {getDebtsCustomerApi} from "@/APIs/getDebtsCustomerApi";
import { useContext } from "react"
import { CustomersContext } from "@/app/customers/CustomersContext"
import { formatDateTime } from "@/APIs/formatDateTime";
export default function CustomerDebtsList() {
    const {selectedCustomer} = useContext(CustomersContext);
    const [customerDebts,setCustomerDebts] = useState([]);

    useEffect(()=>{
        async function fetchCustomerDebts(){
            const result = await getDebtsCustomerApi(selectedCustomer.id);
            if(result.success){
                const formatData = result.debts.map((debt: object) => ({
                    ...debt,
                    debt_date: formatDateTime(debt.debt_date),
                }));
                setCustomerDebts(formatData);
            }

        }
        fetchCustomerDebts();
    })
    /* ===== الأعمدة ===== */
    const columns=[
        { key: "id", title: "id" },
        { key: "amount", title: "المبلغ" },
        { key: "debt_date", title: "التاريخ" },
        {key:"note",title:"ملاحظة"},
    ];
    return (
        <div className="customer-debts-list">
            <h2>قائمة ديون : {selectedCustomer?.name}</h2>
            <div className="customer-debts-list-table">
                <MyTable columns={columns} data={customerDebts} />
            </div>
        </div>
    )
}