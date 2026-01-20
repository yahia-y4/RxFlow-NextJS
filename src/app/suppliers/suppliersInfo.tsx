

import "./suppliers.css"

import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';
import MyInput from "@/components/myInput/myInput";
import MyTextarea from "@/components/myTextarea/myTextarea";
import MyButton from "@/components/mybutton/myButton";
import { useContext } from "react";
import { SuppliersContext } from "@/app/suppliers/suppliersContext";

export default function SuppliersInfo() {
    const {selectedSupplier,setSuppliersInfoVisible,setSupplierInvoicesVisible,setSuppliersPaymentsListVisible,setEditSupplierVisible,supplierInvoicesVisible,suppliersPaymentsListVisible} = useContext(SuppliersContext);
    return (
        <div className="Suppliers-info">
          <h2>تفاصيل المورد</h2>
          <div className="Suppliers-Info-Control">
            <EditSquareIcon onClick={()=>setEditSupplierVisible(true)} style={{fontSize:"30px",cursor:"pointer"}}></EditSquareIcon>
            <DeleteForeverIcon style={{fontSize:"30px",cursor:"pointer"}}></DeleteForeverIcon>
            <ReceiptLongIcon onClick={()=>setSupplierInvoicesVisible(!supplierInvoicesVisible)} style={{fontSize:"30px",cursor:"pointer"}}></ReceiptLongIcon>
            <AttachMoneyIcon onClick={()=>setSuppliersPaymentsListVisible(!suppliersPaymentsListVisible)} style={{fontSize:"30px",cursor:"pointer"}}></AttachMoneyIcon>
            <CloseIcon onClick={()=>{setSuppliersInfoVisible(false)
              setSupplierInvoicesVisible(false)
              setSuppliersPaymentsListVisible(false)
            }} style={{fontSize:"30px",cursor:"pointer"}}></CloseIcon>
          </div>

          <div className="Suppliers-info-content">
            <p>اسم المورد:</p>
            <p>اسم المستودع:</p>
            <p>رقم الهاتف:</p>
            <p>العنوان:</p>
            <p>تاريخ الاضافة :</p>
            <p>تاريخ التحديث :</p>
            <p>معدل/غير معدل:</p>
            <p>المستحقات :</p>
 
          </div>

          <div className="Suppliers-info-inputs">
            <MyInput label_v={"المبلغ"}/>
            <MyTextarea label_v={"ملاحظة"}/>

          </div>
          <div className="Suppliers-info-buts">
            <MyButton>دفع</MyButton>
            <MyButton>الغاء</MyButton>
          </div>


        </div>
    )
}
