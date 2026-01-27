"use client"

import "./suppliers.css"
import AddNewSuppForm from "./addNewSuppForm"
import ListSuppliers from "./listSuppliers"
import SuppliersInfo from "./suppliersInfo"
import SuppliersPaymentsList from "./suppliersPaymentsList"
import EditSuppliers from "./editSuppliers"

import { useContext } from "react"
import { SuppliersContext } from "./suppliersContext"

export default function Suppliers() {
  const {
    suppliersInfoVisible,
    editSupplierVisible,
    suppliersPaymentsListVisible,
    supplierInvoicesVisible,
  } = useContext(SuppliersContext)
  return (
    <div className="Suppliers-page">
      <AddNewSuppForm></AddNewSuppForm>
      {!suppliersPaymentsListVisible && !supplierInvoicesVisible && <ListSuppliers/>}
     { suppliersInfoVisible && <SuppliersInfo/>}

     { suppliersPaymentsListVisible && suppliersInfoVisible && <SuppliersPaymentsList/>}
     { editSupplierVisible && <EditSuppliers/>}
    </div>
  )
}