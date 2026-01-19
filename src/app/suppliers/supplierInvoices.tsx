import "./suppliers.css"
import Invoice from "@/components/invoice/invoice"
export default function SupplierInvoices() {
    return (
        <div className="Suppliers-invoices-list">
            <h2> قائمة الفواتير للمورد : {"فلان"}</h2>
            <div className="Suppliers-invoices-list-Content">
             <Invoice/>
             <Invoice/>
             <Invoice/>
             <Invoice/>
             <Invoice/>
             <Invoice/>
             <Invoice/>

            </div>

        </div>
    )
}