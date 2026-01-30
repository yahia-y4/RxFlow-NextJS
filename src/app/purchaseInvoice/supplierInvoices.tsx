"use client"

import "./purchaseInvoice.css"
import Invoice from "@/components/invoice/invoice"
import {useState,useContext,useEffect} from "react";
import {getAllPurchaseInvoiceApi} from "@/APIs/getAllPurchaseInvoiceApi";

import {LoaderContext} from "@/app/globalsContext/loaderContext"
import {SuccessContext} from "@/app/globalsContext/successContext"
export default function SupplierInvoices() {
    const [invoicesData, setInvoicesData] = useState([]);
    
    const {setIsLoading} =  useContext(LoaderContext);
    const {setIsSuccess , setSuccessMessage} = useContext(SuccessContext);
    useEffect(()=>{
        async function fetchInvoices(){
            setIsLoading(true);
            const result = await getAllPurchaseInvoiceApi();
            if(result.success){
                setInvoicesData(result.invoice);
                setIsLoading(false);
            }else{
                console.log("error in fetching invoices");
                setIsLoading(false);
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