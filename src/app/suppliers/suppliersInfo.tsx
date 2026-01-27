import "./suppliers.css";

import EditSquareIcon from "@mui/icons-material/EditSquare";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CloseIcon from "@mui/icons-material/Close";
import MyInput from "@/components/myInput/myInput";
import MyTextarea from "@/components/myTextarea/myTextarea";
import MyButton from "@/components/mybutton/myButton";
import { useContext, useEffect ,useState } from "react";
import { SuppliersContext } from "@/app/suppliers/suppliersContext";
import { getOneSupplierApi } from "@/APIs/getOneSupplierApi";
import { ErrorContext } from "../globalsContext/errorContext";

export default function SuppliersInfo() {
  
  const {setErrorCardMessage,setErrorCardVisible,}=useContext(ErrorContext)
  const {
    selectedSupplier,
    setSelectedSupplier,
    setSuppliersInfoVisible,
    setSupplierInvoicesVisible,
    setSuppliersPaymentsListVisible,
    setEditSupplierVisible,
    supplierInvoicesVisible,
    suppliersPaymentsListVisible,
    selectedSupplierID,
    
  } = useContext(SuppliersContext);

  useEffect(() => {
    async function getOneSupplier() {
      const response = await getOneSupplierApi(selectedSupplierID);
      if(response.success){
          setSelectedSupplier(response.supplier)
      }else{
        setErrorCardMessage(response.message)
        setErrorCardVisible(true)

      }
    }
    getOneSupplier()
  }, [selectedSupplierID]);
  return (
    <div className="Suppliers-info">
      <h2>تفاصيل المورد</h2>
      <div className="Suppliers-Info-Control">
        <EditSquareIcon
          onClick={() => setEditSupplierVisible(true)}
          style={{ fontSize: "30px", cursor: "pointer" }}
        ></EditSquareIcon>
        <DeleteForeverIcon
          style={{ fontSize: "30px", cursor: "pointer" }}
        ></DeleteForeverIcon>
        <ReceiptLongIcon
          onClick={() => setSupplierInvoicesVisible(!supplierInvoicesVisible)}
          style={{ fontSize: "30px", cursor: "pointer" }}
        ></ReceiptLongIcon>
        <AttachMoneyIcon
          onClick={() =>
            setSuppliersPaymentsListVisible(!suppliersPaymentsListVisible)
          }
          style={{ fontSize: "30px", cursor: "pointer" }}
        ></AttachMoneyIcon>
        <CloseIcon
          onClick={() => {
            setSuppliersInfoVisible(false);
            setSupplierInvoicesVisible(false);
            setSuppliersPaymentsListVisible(false);
          }}
          style={{ fontSize: "30px", cursor: "pointer" }}
        ></CloseIcon>
      </div>

      <div className="Suppliers-info-content">
        <p>الرقم : {setSelectedSupplier.id}</p>
        <p>اسم المورد: {setSelectedSupplier.name}</p>
        <p>اسم المستودع: {setSelectedSupplier.warehouse_name}</p>
        <p>رقم الهاتف: {setSelectedSupplier.phone_number}</p>
        <p>العنوان: {setSelectedSupplier.location}</p>
        <p>تاريخ الاضافة : {setSelectedSupplier.createdAt}</p>
        {setSelectedSupplier.isUpdated &&  <p> معدل</p>}
        {setSelectedSupplier.isUpdated && <p>تاريخ اخر تعديل : {setSelectedSupplier.updatedAt}</p>}
        <p>المستحقات : {setSelectedSupplier.payable_amount}</p>
      </div>

      <div className="Suppliers-info-inputs">
        <MyInput label_v={"المبلغ"} />
        <MyTextarea label_v={"ملاحظة"} />
      </div>
      <div className="Suppliers-info-buts">
        <MyButton>دفع</MyButton>
        <MyButton>الغاء</MyButton>
      </div>
    </div>
  );
}
