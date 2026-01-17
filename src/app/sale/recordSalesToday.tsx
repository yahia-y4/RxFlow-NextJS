import { useState } from "react";
import "./sale.css"
import MyTable, { TableColumn } from "@/components/myTable/myTable";
export default function RecordSalesToday() {
    const [data, setData] = useState<InvoiceItem[]>([
        {
          id: 1,
          name: "باراسيتامول",
          company: "ABC Pharma",
          form: "أقراص",
          price: 2.5,
          quantity: 1,
          date:"2023-09-01"
        },
        {
          id: 2,
          name: "أموكسيسيلين",
          company: "XYZ Pharma",
          form: "كبسولات",
          price: 5,
          quantity: 2,
          date:"2023-09-01"
        },
        {
          id: 3,
          name: "كولسترول",
          company: "LMN Pharma",
          form: "أقراص",
          price: 3,
          quantity: 1,
          date:"2023-09-01"
        },
      ]);
      /* ===== الأعمدة ===== */
      const columns: TableColumn<InvoiceItem>[] = [
        { key: "name", title: "اسم الدواء" },
        { key: "company", title: "الشركة" },
        { key: "form", title: "الشكل" },
        {
          key: "price",
          title: "سعر الشراء",
          render: (row) => `${row.price} $`,
        },
        {
          key: "quantity",
          title: "الكمية",
          render: (row) => `${row.quantity} ${row.form}`,
        },
        {
          key: "total",
          title: "المجموع",
          render: (row) => `${row.price * row.quantity} $`,
        },
        {
            key:"date",
            title:"التاريخ",
            render:(row)=>`${row.date}`
        }
      ];
    return (
        <div className="record-sales-today">
            <h3> بيع اليوم</h3>
            <div className="record-today-table-div">
                <MyTable data={data} columns={columns} />
            </div>
        </div>
    )
}