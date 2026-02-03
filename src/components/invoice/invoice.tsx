"use client"

import "./invoice.css"

import { formatDateTime } from "@/APIs/formatDateTime";
import MyTable from "@/components/myTable/myTable";
import {truncateToTwoDecimals} from "@/APIs/truncateToTwoDecimals";
export default function Invoice({dataInvoice}:{dataInvoice:object}) {

const itemsData = dataInvoice.Items.map((item:object)=>({
    id: item.id,
    name:item.name,
    company:item.company,
    form:item.form,
    price: item.item_many_invoice.price,
    quantity: item.item_many_invoice.quantity,
    total_price:  truncateToTwoDecimals(item.item_many_invoice.price * item.item_many_invoice.quantity),
}))

        const columns = [
          { key: "id", title: "id" },
           { key: "name", title: "اسم الدواء" },
           { key: "company", title: "الشركة" },
           { key: "form", title: "الشكل" },
           { key: "price", title: "سعر الشراء" },
           { key: "quantity", title: "الكمية" },
           { key: "total_price", title: "السعر الإجمالي" },
       ]
  return (
    <div className="Invoice">
<div className="Invoice-title">
  فاتورة مشتريات من المورد : {dataInvoice.warehouse.name}
</div>
<div className="Invoice-info">
    <p className="one-info">رقم الفاتورة : {dataInvoice.id}</p>
    <p className="one-info">عدد الأصناف : {dataInvoice.Items.length}</p>
    <p className="one-info"> عدد القطع : {dataInvoice.Items.reduce((acc, item) => acc + item.item_many_invoice.quantity, 0)}</p>
    <p className="one-info">سعر الإجمالي : {dataInvoice.total_price}</p>
    <p className="one-info">المبلغ المدفوع : {dataInvoice.paid_amount}</p>
    <p className="one-info">حالة التسديد وقت الشراء : {dataInvoice.payment_status}</p>
    <p className="one-info">تاريخ الفاتورة : {formatDateTime(dataInvoice.createdAt)}</p>
    <p className="one-info">جدول الادوية : </p>
</div>
<div className="Invoice-table">
  <MyTable columns={columns} data={itemsData} />
</div>


    </div>
  )
}