"use client"

import "./invoice.css"
import { useState } from "react";

import MyTable from "@/components/myTable/myTable";
export default function Invoice() {
  const data = [
          {
            id: 1,
            name: "ترامادول",
            company: "شركة النيل",
            form: "اقراص",
            price: 50,
            quantity: 200,
            total_price: 1000,
          },
          {
            id: 2,
            name: "ترامادول",
            company: "شركة النيل",
            form: "اقراص",
            price: 50,
            quantity: 200,
            total_price: 1000,
          },
       ]
        const columns = [
           { key: "name", title: "اسم الدواء" },
           { key: "company", title: "الشركة" },
           { key: "form", title: "الشكل" },
           { key: "price", title: "سعر الشراء" },
           { key: "quantity", title: "الكمية" },
           { key: "total_price", title: "سعر الإجمالي" },
       ]
  return (
    <div className="Invoice">
<div className="Invoice-title">
  فاتورة مشتريات من المورد : {"فلان"}
</div>
<div className="Invoice-info">
    <p className="one-info">رقم الفاتورة : {"123456"}</p>
    <p className="one-info">عدد الأصناف : {"3"}</p>
    <p className="one-info"> عدد القطع : {"6"}</p>
    <p className="one-info">سعر الإجمالي : {"15.00 $"}</p>
    <p className="one-info">المبلغ المدفوع : {"15.00 $"}</p>
    <p className="one-info">حالة التسديد وقت الشراء : {"مدفوع"}</p>
    <p className="one-info">تاريخ الفاتورة : {"2023-01-01"}</p>
    <p className="one-info">جدول الادوية : </p>
</div>
<div className="Invoice-table">
  <MyTable columns={columns} data={data} />
</div>


    </div>
  )
}