import { useState } from "react";
import "./storage.css";

import MySelect from "@/components/mySelect/mySelect";
import MyTable, { TableColumn } from "@/components/myTable/myTable";
import MyInput from "@/components/myInput/myInput";
import MyButton from "@/components/mybutton/myButton";

/* ================== Types ================== */
type InvoiceItem = {
  id: number;
  name: string;
  company: string;
  form: string;
  price: number;
  quantity: number;
};

/* ================== Component ================== */
export default function Invoice() {
  const [data, setData] = useState<InvoiceItem[]>([
    {
      id: 1,
      name: "باراسيتامول",
      company: "ABC Pharma",
      form: "أقراص",
      price: 2.5,
      quantity: 1,
    },
    {
      id: 2,
      name: "أموكسيسيلين",
      company: "XYZ Pharma",
      form: "كبسولات",
      price: 5,
      quantity: 2,
    },
   
  ]);

  /* ===== تحديث الكمية ===== */
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 0) return;

    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

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
      render: (row) => (
        <MyInput
          type_v="number"
     
          input_v={row.quantity}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) =>
            updateQuantity(row.id, Number(e.target.value))
          }
          
        />
      ),
    },
    {
      key: "total",
      title: "المجموع",
      render: (row) => (row.price * row.quantity).toFixed(2),
    },
  ];

  /* ===== إجمالي الفاتورة ===== */
  const invoiceTotal = data.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* ================== JSX ================== */
  return (
    <div className="invoiceStorage">
      <h3>فاتورة شراء أدوية</h3>

      <p>اختر المورد</p>
      <MySelect  options_v={["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]} />

<div style={{height:"500px",overflow:"auto",width:"100%",marginTop:"20px",border:"1px solid #ccc",borderRadius:"5px"}}>

   <MyTable<InvoiceItem>
        columns={columns}
        data={data}
      />
</div>

   
<div className="invoiceTotalDiv">
      <h4>إجمالي الفاتورة: {invoiceTotal.toFixed(2)} $</h4>
      <MyInput plaseholder_v={"المدفوع"} > </MyInput>
</div>
<div className="invoiceButs">

  <MyButton >حفظ الفاتورة</MyButton>
    <MyButton >إلغاء الفاتورة</MyButton>
</div>
    </div>
  );
}
