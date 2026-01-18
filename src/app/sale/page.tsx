"use client"
import "./sale.css"
import SaleForm from "./saleForm";
import GroupItems from "./groupItems";
import RecordSalesToday from "./recordSalesToday";
import { SaleContext } from "./saleContext";
import { useContext } from "react";
export default function SalePage() {
  const {saleGroupVisible, saleRecordVisible} = useContext(SaleContext);

  return (
    <div className="sale-page">
     <SaleForm></SaleForm>
    { saleGroupVisible && <GroupItems></GroupItems>}
    { saleRecordVisible && <RecordSalesToday></RecordSalesToday>}
    </div>
  );
}