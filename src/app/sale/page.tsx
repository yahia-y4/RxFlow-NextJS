"use client"
import "./sale.css"
import SaleForm from "./saleForm";
import GroupItems from "./groupItems";
import RecordSalesToday from "./recordSalesToday";

export default function SalePage() {
  return (
    <div className="sale-page">
     <SaleForm></SaleForm>
     <GroupItems></GroupItems>
     <RecordSalesToday></RecordSalesToday>
    </div>
  );
}