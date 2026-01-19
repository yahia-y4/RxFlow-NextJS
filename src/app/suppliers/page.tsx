import "./suppliers.css"
import AddNewSuppForm from "./addNewSuppForm"
import ListSuppliers from "./listSuppliers"
export default function Suppliers() {
  return (
    <div className="Suppliers-page">
      <AddNewSuppForm></AddNewSuppForm>
      <ListSuppliers></ListSuppliers>
    </div>
  )
}