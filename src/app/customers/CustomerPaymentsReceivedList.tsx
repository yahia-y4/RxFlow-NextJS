"use client"
import "./customers.css"

import MyTable from "@/components/myTable/myTable";
import { useState,useEffect } from "react";
import {getReceivePaymentCustomerApi} from "@/APIs/getReceivePaymentCustomerApi";
import { useContext } from "react"
import { CustomersContext } from "@/app/customers/CustomersContext"
import { formatDateTime } from "@/APIs/formatDateTime";
export default function CustomerPaymentsReceivedList() {
    const {selectedCustomer} = useContext(CustomersContext);
    const [customerPaymentsReceived,setCustomerPaymentsReceived] = useState([]);





useEffect(()=>{
        async function fetchCustomerPaymentsReceived(){
            const result = await getReceivePaymentCustomerApi(selectedCustomer.id);
            if(result.success){
                const formatData = result.payments.map((payment: object) => ({
                    ...payment,
                    payment_date: formatDateTime(payment.payment_date),
                }));
                setCustomerPaymentsReceived(formatData);
            }
        }
        fetchCustomerPaymentsReceived();
    })


    /* ===== الأعمدة ===== */
    const columns=[
        { key: "id", title: "id" },
        { key: "amount", title: "المبلغ" },
        { key: "payment_date", title: "التاريخ" },
        {key:"note",title:"ملاحظة"},
    ];
    return (
        <div className="customer-debts-list">
            <h2>قائمة مدفوعات : {selectedCustomer?.name}</h2>
            <div className="customer-debts-list-table">
                <MyTable columns={columns} data={customerPaymentsReceived} />
            </div>
        </div>
    )
}