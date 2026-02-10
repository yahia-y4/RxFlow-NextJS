"use client"

import "./purchaseInvoice.css"

import SupplierInvoices from "./supplierInvoices"
import{SelectedPageContext} from "@/app/globalsContext/selectedPageContext"
import { useContext, useEffect } from "react"
export default function PurchaseInvoicePage() {

      const {setSelectedPage}=useContext(SelectedPageContext);
  
  useEffect(()=>{
    setSelectedPage("");
  },[])



    return (
        <div className="Purchase-invoice-page">
            
            <SupplierInvoices/>
            
        </div>
    )
}