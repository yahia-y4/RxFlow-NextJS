"use client";
import { useContext } from "react";
import "./storage.css";

import MySelect from "@/components/mySelect/mySelect";
import MyTable, { TableColumn } from "@/components/myTable/myTable";
import MyInput from "@/components/myInput/myInput";
import MyButton from "@/components/mybutton/myButton";
import { getSuppliersApi } from "@/APIs/getSuppliersApi";
import {addPurchaseInvoiceApi} from "@/APIs/addPurchaseInvoiceApi";
import { useEffect, useState } from "react";
import { StorageContext } from "./storageContext";
import { ErrorContext } from "../globalsContext/errorContext";

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
  const context = useContext(StorageContext);
  const [suppliers,setSuppliers] = useState([]);
  const {setErrorCardMessage,setErrorCardVisible} = useContext(ErrorContext)

  if (!context) {
    throw new Error("Invoice must be used within StorageContext.Provider");
  }

  const {
    InvoiceData,
    setInvoiceData,
    tempItemsInvoice,
    setTempItemsInvoice,
    setAddInvoiceVisible
  } = context;

useEffect(()=>{
  async function getSuppliers() {
    const suppliers = await getSuppliersApi();
    if(suppliers.success){
      const supplierOptions = suppliers.suppliers.map((supplier) => ({
        value: supplier.id,
        label: supplier.name,
      }));
      setSuppliers(supplierOptions);
      
    }
  }
  getSuppliers();
},[])

  /* ===== تحديث الكمية ===== */
  const updateQuantity = (id: number, quantity: number) => {
    if (Number.isNaN(quantity) || quantity < 0) return;

    setTempItemsInvoice((prev) =>
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
  const invoiceTotal = tempItemsInvoice.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* ===== حفظ الفاتورة ===== */
 async function saveInvoice() {
  const response = await addPurchaseInvoiceApi(InvoiceData)
  if(response.success){
   console.log(response.message)
    setInvoiceData({
    warehouseId: "",
    paid_amount:"",
    note:"y",
    items: []
  })
  setTempItemsInvoice([]);
  setAddInvoiceVisible(false)
  }else{
     setErrorCardVisible(true)
     setErrorCardMessage(response.message)
  }
    

  };
  const cancelInvoice =()=>{
    setInvoiceData({
    warehouseId: "",
    paid_amount:"",
    note:"y",
    items: []
  })

  setTempItemsInvoice([]);
  setAddInvoiceVisible(false)
  }

  /* ================== JSX ================== */
  return (
    <div className="invoiceStorage">
      <h3>فاتورة شراء أدوية</h3>

      <p>اختر المورد</p>
   <MySelect
  options_v={suppliers}
  value_v={InvoiceData.warehouseId}
  placeholder="اختر المورد"
  onChange={(e) => {
    setInvoiceData((prev) => ({
      ...prev,
      warehouseId: e.target.value,
    }));
  }}
/>



      <div
        style={{
          height: "500px",
          overflow: "auto",
          width: "100%",
          marginTop: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        <MyTable<InvoiceItem>
          columns={columns}
          data={tempItemsInvoice}
        />
      </div>

      <div className="invoiceTotalDiv">
        <h4>إجمالي الفاتورة: {invoiceTotal.toFixed(2)} $</h4>
        <MyInput
          plaseholder_v="المدفوع"
          input_v={InvoiceData.paid_amount}
          onChange={(e) =>
            setInvoiceData((prev) => ({
              ...prev,
              paid_amount: e.target.value,
            }))
          }
        />
      </div>

      <div className="invoiceButs">
        <MyButton onClick={saveInvoice}>حفظ الفاتورة</MyButton>
        <MyButton onClick={cancelInvoice}>إلغاء الفاتورة</MyButton>
      </div>
    </div>
  );
}
