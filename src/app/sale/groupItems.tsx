
import "./sale.css"
import MyTable , { TableColumn } from "@/components/myTable/myTable";
import MyButton from "@/components/mybutton/myButton";
import { useContext } from "react";
import { SaleContext } from "./saleContext";
import { useState } from "react";
export default function GroupItems() {
  const {setSaleGroupVisible,itemsInGroup} = useContext(SaleContext)
   
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
            <MyTable data={itemsInGroup} columns={columns} />
        </div>
        <div className="group-items-total-price">
       
                السعر الإجمالي: {itemsInGroup.reduce((acc, cur) => acc + cur.sale_price * cur.quantity, 0)} $
           
        </div>
        <div className="group-items-buts">
            <MyButton >بيع</MyButton>
            <MyButton onClick={()=>{setSaleGroupVisible(false)}}>الغاء </MyButton>
        </div>
     
    </div>
  );
}

