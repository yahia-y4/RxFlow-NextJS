
import "./sale.css"
import MyTable , { TableColumn } from "@/components/myTable/myTable";
import MyButton from "@/components/mybutton/myButton";

import { useState } from "react";
export default function GroupItems() {
    const [data, setData] = useState([
        {
          id: 1,
          name: "باراسيتامول",
          company: "ABC Pharma",
          form: "أقراص",
          sale_price: 2.5,
          quantity: 1,
        },
        {
          id: 2,
          name: "أموكسيسيلين",
          company: "XYZ Pharma",
          form: "كبسولات",
          sale_price: 5,
          quantity: 2,
        },
        {
          id: 3,
          name: "ميكروبول",
          company: "ABC Pharma",
          form: "أقراص",
          sale_price: 3,
          quantity: 1,
        },
      ]);
    /* ===== الأعمدة ===== */
    const columns = [
        { key: "name", title: "اسم الدواء" },
        { key: "company", title: "الشركة" },
        { key: "form", title: "الشكل" },
        {
          key: "price",
          title: "سعر البيع",
          render: (row) => `${row.sale_price} $`,
        },
        {
          key: "quantity",
          title: "الكمية",
          render: (row) => `${row.quantity}`,
        },
      ];
  return (
    <div className="group-items">
        <h3> بيع مجموعة أدوية</h3>
        <div className="group-items-table-div">
            <MyTable data={data} columns={columns} />
        </div>
        <div className="group-items-total-price">
       
                السعر الإجمالي: {data.reduce((acc, cur) => acc + cur.sale_price * cur.quantity, 0)} $
           
        </div>
        <div className="group-items-buts">
            <MyButton>بيع</MyButton>
            <MyButton>الغاء </MyButton>
        </div>
     
    </div>
  );
}

