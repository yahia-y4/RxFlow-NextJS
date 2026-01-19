import "./suppliers.css"
import AddNewSuppForm from "./addNewSuppForm"
import ListSuppliers from "./listSuppliers"
import SuppliersInfo from "./suppliersInfo"
import SuppliersPaymentsList from "./suppliersPaymentsList"
import SupplierInvoices from "./supplierInvoices"
import EditSuppliers from "./editSuppliers"



export default function Suppliers() {
  return (
    <div className="Suppliers-page">
      <AddNewSuppForm></AddNewSuppForm>
      <ListSuppliers></ListSuppliers>
      <SuppliersInfo></SuppliersInfo>
      {/* <SuppliersPaymentsList></SuppliersPaymentsList> */}
      {/* <SupplierInvoices></SupplierInvoices> */}
      {/* <EditSuppliers></EditSuppliers> */}
    </div>
  )
}