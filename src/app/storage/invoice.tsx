"use client";

import { useContext, useEffect, useState } from "react";
import "./storage.css";

import MySelect from "@/components/mySelect/mySelect";
import MyTable, { TableColumn } from "@/components/myTable/myTable";
import MyInput from "@/components/myInput/myInput";
import MyButton from "@/components/mybutton/myButton";

import { getSuppliersApi } from "@/APIs/getSuppliersApi";
import { addPurchaseInvoiceApi } from "@/APIs/addPurchaseInvoiceApi";

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
  const storageContext = useContext(StorageContext);
  const errorContext = useContext(ErrorContext);

  if (!storageContext || !errorContext) {
    throw new Error("Context not found");
  }

  const {
    InvoiceData,
    setInvoiceData,
    tempItemsInvoice,
    setTempItemsInvoice,
    setAddInvoiceVisible,
  } = storageContext;

  const { setErrorCardMessage, setErrorCardVisible } = errorContext;

  const [suppliers, setSuppliers] = useState<
    { value: number; label: string }[]
  >([]);

  /* ================== جلب الموردين ================== */
  useEffect(() => {
    async function fetchSuppliers() {
      const res = await getSuppliersApi();
      if (res?.success) {
        setSuppliers(
          res.suppliers.map((s: any) => ({
            value: s.id,
            label: s.name,
          }))
        );
      }
    }
    fetchSuppliers();
  }, []);

  /* ================== تحديث الكمية ================== */
  const updateQuantity = (id: number, quantity: number) => {
    if (Number.isNaN(quantity) || quantity < 0) return;

    setTempItemsInvoice((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  /* ================== أعمدة الجدول ================== */
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

  /* ================== إجمالي الفاتورة ================== */
  const invoiceTotal = tempItemsInvoice.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* ================== حفظ الفاتورة ================== */
  async function saveInvoice() {
    if (tempItemsInvoice.length === 0) {
      setErrorCardVisible(true);
      setErrorCardMessage("الفاتورة فارغة");
      return;
    }

    const payload = {
      warehouseId: Number(InvoiceData.warehouseId),
      paid_amount: Number(InvoiceData.paid_amount),
      note: InvoiceData.note,
      items: tempItemsInvoice.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    const response = await addPurchaseInvoiceApi(payload);

    if (response.success) {
      setInvoiceData({
        warehouseId: "",
        paid_amount: "",
        note: "",
        items: [],
      });
      setTempItemsInvoice([]);
      setAddInvoiceVisible(false);
    } else {
      setErrorCardVisible(true);
      setErrorCardMessage(response.message);
    }
  }

  /* ================== إلغاء الفاتورة ================== */
  function cancelInvoice() {
    setInvoiceData({
      warehouseId: "",
      paid_amount: "",
      note: "",
      items: [],
    });
    setTempItemsInvoice([]);
    setAddInvoiceVisible(false);
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
        onChange={(e) =>
          setInvoiceData((prev) => ({
            ...prev,
            warehouseId: e.target.value,
          }))
        }
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
