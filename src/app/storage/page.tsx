"use client"
import "./storage.css"
import StorageRightPart from "./storageRightPart"
import ItemsTable from "./itemsTable"
import Invoice from "./invoice"
import OneItemInfo from "./oneItemInfo"
import IditItem from "./editItem"
import { StorageContext } from "./storageContext"
import { useContext } from "react"
export default function StoragePage() {  
  const {addInvoiceVisible , editItemVisible,itemInfoVisible} = useContext(StorageContext)
console.log(itemInfoVisible);
  return(
   

    <div className="storagePage">

        
         <StorageRightPart></StorageRightPart>
          <ItemsTable></ItemsTable>
          {addInvoiceVisible && <Invoice></Invoice>}
          {itemInfoVisible && <OneItemInfo></OneItemInfo>}
          {editItemVisible && <IditItem></IditItem>} 
          
    </div>
  )
}