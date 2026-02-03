import "./suppliers.css";

import EditSquareIcon from "@mui/icons-material/EditSquare";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CloseIcon from "@mui/icons-material/Close";
import MyInput from "@/components/myInput/myInput";
import MyTextarea from "@/components/myTextarea/myTextarea";
import MyButton from "@/components/mybutton/myButton";
import { useContext, useEffect,useState } from "react";
import { SuppliersContext } from "@/app/suppliers/suppliersContext";
import { getOneSupplierApi } from "@/APIs/getOneSupplierApi";
import { ErrorContext } from "../globalsContext/errorContext";
import { WarningContext } from "../globalsContext/warningContext";
import { deleteSupplierApi } from "@/APIs/deleteSupplierApi";
import { getSuppliersApi } from "@/APIs/getSuppliersApi";
import { sendPaymentSupplierApi } from "@/APIs/sendPaymentSupplierApi";
import { formatDateTime } from "@/APIs/formatDateTime";
import {truncateToTwoDecimals} from "@/APIs/truncateToTwoDecimals";
import {LoaderContext} from "@/app/globalsContext/loaderContext"
import {SuccessContext} from "@/app/globalsContext/successContext"

export default function SuppliersInfo() {
  
  const {setErrorCardMessage,setErrorCardVisible,}=useContext(ErrorContext)
  const {setWarningFunction,setWarningCardVisible,setWarningCardMessage}=useContext(WarningContext)
  const [sendPaymentData,setSendPaymentData]=useState({
    payable_amount_send:0,
    note:""
  })


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
    setSuppliers
    
  } = useContext(SuppliersContext);



    const {setIsLoading} =  useContext(LoaderContext);
    const {setIsSuccess , setSuccessMessage} = useContext(SuccessContext);


  useEffect(() => {
    async function getOneSupplier() {
      const response = await getOneSupplierApi(selectedSupplierID);
      if(response.success){
        await  setSelectedSupplier(response.supplier)
        
      }else{
        setErrorCardMessage(response.message)
        setErrorCardVisible(true)

      }
    }
    getOneSupplier()
  }, [selectedSupplierID]);

async function deleteSupplier(){
  setIsLoading(true)
  const response = await deleteSupplierApi(selectedSupplierID)
  if(response.success){
    const supps = await getSuppliersApi()
    if(supps.success){
      setSuppliers(supps.suppliers)
       setSuppliersInfoVisible(false)
      setSupplierInvoicesVisible(false)
      setSuppliersPaymentsListVisible(false)
      setIsLoading(false)
      setSuccessMessage("تم حذف المورد بنجاح")
      setIsSuccess(true)
    }
   

  }else{
    setErrorCardMessage(response.message)
    setErrorCardVisible(true)
    setIsLoading(false)
  }
}
function confirmDeleteSupplier(){
  setWarningCardMessage("هل أنت متأكد من حذف هذا المورد ؟")
  setWarningFunction(() => deleteSupplier)
  setWarningCardVisible(true)
}

async function sendPaymentSupplier(){
  setIsLoading(true)
  const response = await sendPaymentSupplierApi(selectedSupplierID,sendPaymentData)
  if(response.success){
    const supps = await getSuppliersApi()
    const updatedSupplier = await getOneSupplierApi(selectedSupplierID)
    
    if(supps.success && updatedSupplier.success){
      setSuppliers(supps.suppliers)
      setSelectedSupplier(updatedSupplier.supplier)
      emptyPaymentSupplier()
      setIsLoading(false)
      setSuccessMessage("تمت عملية الدفع بنجاح")
      setIsSuccess(true)
       
    }
   

  }else{
    setErrorCardMessage(response.message)
    setErrorCardVisible(true)
    setIsLoading(false)
  }
}
function emptyPaymentSupplier(){
  setSendPaymentData({
    payable_amount_send:0,
    note:""
  })
}

  return (
    <div className="Suppliers-info">
      <h2>تفاصيل المورد</h2>
      <div className="Suppliers-Info-Control">
        <EditSquareIcon
          onClick={() => setEditSupplierVisible(true)}
          style={{ fontSize: "30px", cursor: "pointer" }}
        ></EditSquareIcon>
        <DeleteForeverIcon 
          onClick={confirmDeleteSupplier}
          style={{ fontSize: "30px", cursor: "pointer" }}
        ></DeleteForeverIcon>
        {/* <ReceiptLongIcon
          onClick={() => setSupplierInvoicesVisible(!supplierInvoicesVisible)}
          style={{ fontSize: "30px", cursor: "pointer" }}
        ></ReceiptLongIcon> */}
        <AttachMoneyIcon className={suppliersPaymentsListVisible === true ? "active" : ""} 
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
        <p>الرقم : {selectedSupplier.id}</p>
        <p>اسم المورد: {selectedSupplier.name}</p>
        <p>اسم المستودع: {selectedSupplier.warehouse_name}</p>
        <p>رقم الهاتف: {selectedSupplier.phone_number}</p>
        <p>العنوان: {selectedSupplier.location}</p>
        <p>تاريخ الاضافة : {formatDateTime(selectedSupplier.createdAt)}</p>
        {selectedSupplier.isUpdated &&  <p> معدل</p>}
        {selectedSupplier.isUpdated && <p>تاريخ اخر تعديل : {formatDateTime(selectedSupplier.updatedAt)}</p>}
        <p>المستحقات : {truncateToTwoDecimals(selectedSupplier.payable_amount)} $</p>
      </div>

      <div className="Suppliers-info-inputs">
        <MyInput type_v="number" label_v={"المبلغ $"} input_v={sendPaymentData.payable_amount_send} onChange={(e) => setSendPaymentData({...sendPaymentData, payable_amount_send: Number(e.target.value)})} />
        <MyTextarea label_v={"ملاحظة"} data_v={sendPaymentData.note} onChange={(e) => setSendPaymentData({...sendPaymentData, note: e.target.value})} />
      </div>
      <div className="Suppliers-info-buts">
        <MyButton onClick={sendPaymentSupplier}>دفع</MyButton>
        <MyButton onClick={emptyPaymentSupplier}>الغاء</MyButton>
      </div>
    </div>
  );
}
