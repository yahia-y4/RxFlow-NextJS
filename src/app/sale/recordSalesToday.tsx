"use client";
import "./sale.css";
import { useEffect, useState, useContext } from "react";
import MyTable, { TableColumn } from "@/components/myTable/myTable";
import { getAllSalesRecords } from "@/APIs/getAllSalesRecords";
import { truncateToTwoDecimals } from "@/APIs/truncateToTwoDecimals";
import { SaleContext } from "./saleContext";

/* ================== Types ================== */

type SalesRecordItem = {
  invoiceId: number;
  name: string;
  company: string;
  form: string;
  quantity: number;
  price: number;
  total: number;
  createdAt: string;
};

/* ================== Component ================== */

export default function RecordSalesToday() {
  /* ===== بيانات تجريبية (كما تأتي من الباك اند) ===== */
  const { SalesRecordData, setSalesRecordData } = useContext(SaleContext);

  useEffect(() => {
    async function fetchSalesRecords() {
      const res = await getAllSalesRecords();
      if (res.success) {
        setSalesRecordData(res.data);
      } else {
        console.log("Failed to fetch sales records");
      }
    }
    fetchSalesRecords();
  }, []);

  /* ===== تجهيز البيانات للجدول (Flatten) ===== */

  const tableData: SalesRecordItem[] = SalesRecordData.flatMap((invoice) =>
    invoice.Items.map((item: any) => ({
      invoiceId: invoice.id,
      name: item.name,
      company: item.company,
      form: item.form,
      quantity: item.item_many_salesRecord.quantity,
      price: item.item_many_salesRecord.price,
      total: truncateToTwoDecimals(
        item.item_many_salesRecord.quantity * item.item_many_salesRecord.price,
      ),
      createdAt: invoice.createdAt,
    })),
  );
  // ترتيب البيانات حسب التاريخ (الأحدث أولاً)
  tableData.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  /* ===== الأعمدة ===== */
  const columns: TableColumn<SalesRecordItem>[] = [
    { key: "name", title: "اسم الدواء" },
    { key: "company", title: "الشركة" },
    { key: "form", title: "الشكل" },
    {
      key: "price",
      title: "السعر للوحدة",
      render: (row) => `${row.price} $`,
    },
    {
      key: "quantity",
      title: "الكمية",
      render: (row) => `${row.quantity}`,
    },
    {
      key: "total",
      title: "المجموع",
      render: (row) => `${row.total} $`,
    },
    {
      key: "createdAt",
      title: "التاريخ",
      render: (row) =>
        new Date(row.createdAt).toLocaleDateString("SY", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
    },
  ];

  /* ================== JSX ================== */
  return (
    <div className="record-sales-today">
      <h3>سجل المبيعات</h3>

      <div className="record-today-table-div">
        <MyTable data={tableData} columns={columns} />
      </div>
    </div>
  );
}
