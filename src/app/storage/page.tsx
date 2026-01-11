"use client"
import "./storage.css"
import StorageRightPart from "./storageRightPart"
import ItemsTable from "./itemsTable"
import Invoice from "./invoice"
export default function StoragePage() {  
  return(
    <div className="storagePage">
        <StorageRightPart></StorageRightPart>

        <ItemsTable></ItemsTable>
          <Invoice></Invoice>
    </div>
  )
}