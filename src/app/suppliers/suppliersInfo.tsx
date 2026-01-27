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
  const {setErrorCardMessage,setErrorCardVisible}=useContext(ErrorContext)
  const {
    selectedSupplier,
    setSuppliersInfoVisible,
    setSupplierInvoicesVisible,
    setSuppliersPaymentsListVisible,
    setEditSupplierVisible,
    supplierInvoicesVisible,
    suppliersPaymentsListVisible,
    selectedSupplierID,
  } = useContext(SuppliersContext);

  const [Supplier,setSupplier]=useState({})
  console.log(Supplier)
  useEffect(() => {
    async function getOneSupplier() {
      const response = await getOneSupplierApi(selectedSupplierID);
      if(response.success){
          setSupplier(response.supplier)
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
        <p>الرقم : {Supplier.id}</p>
        <p>اسم المورد: {Supplier.name}</p>
        <p>اسم المستودع: {Supplier.warehouse_name}</p>
        <p>رقم الهاتف: {Supplier.phone_number}</p>
        <p>العنوان: {Supplier.location}</p>
        <p>تاريخ الاضافة : {Supplier.createdAt}</p>
        {Supplier.isUpdated &&  <p> معدل</p>}
        {Supplier.isUpdated && <p>تاريخ اخر تعديل : {Supplier.updatedAt}</p>}
        <p>المستحقات : {Supplier.payable_amount}</p>
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
