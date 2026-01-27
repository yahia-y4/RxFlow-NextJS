import "./purchaseInvoice.css"
import Invoice from "@/components/invoice/invoice"
export default function SupplierInvoices() {
    return (
        <div className="Suppliers-invoices-list">
            <h2> قائمة الفواتير </h2>
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