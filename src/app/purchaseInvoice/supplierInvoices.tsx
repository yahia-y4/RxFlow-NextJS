"use client"

import "./purchaseInvoice.css"
import Invoice from "@/components/invoice/invoice"
import {useState} from "react";
import {getAllPurchaseInvoiceApi} from "@/APIs/getAllPurchaseInvoiceApi";
export default function SupplierInvoices() {
    const [invoicesData, setInvoicesData] = useState([]);
    useState(()=>{


        async function fetchInvoices(){
            const result = await getAllPurchaseInvoiceApi();
            if(result.success){
                setInvoicesData(result.invoice);
            }
        }
   fetchInvoices();
    },[])
let invoicesList = null;
if(invoicesData.length > 0){
   invoicesList = invoicesData.map((invoice:object)=>(
        <Invoice key={invoice.id} dataInvoice={invoice} />
    ))
}
    
    return (
        <div className="Suppliers-invoices-list">
            <h2> قائمة الفواتير </h2>
            <div className="Suppliers-invoices-list-Content">
            {invoicesList}
       

            </div>

        </div>
    )
}