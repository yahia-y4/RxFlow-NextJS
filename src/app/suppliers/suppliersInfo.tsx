

import "./suppliers.css"

import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';
import MyInput from "@/components/myInput/myInput";
import MyTextarea from "@/components/myTextarea/myTextarea";
import MyButton from "@/components/mybutton/myButton";

export default function SuppliersInfo() {
    return (
        <div className="Suppliers-info">
          <h2>تفاصيل المورد</h2>
          <div className="Suppliers-Info-Control">
            <EditSquareIcon style={{fontSize:"30px",cursor:"pointer"}}></EditSquareIcon>
            <DeleteForeverIcon style={{fontSize:"30px",cursor:"pointer"}}></DeleteForeverIcon>
            <ReceiptLongIcon style={{fontSize:"30px",cursor:"pointer"}}></ReceiptLongIcon>
            <AttachMoneyIcon style={{fontSize:"30px",cursor:"pointer"}}></AttachMoneyIcon>
            <CloseIcon style={{fontSize:"30px",cursor:"pointer"}}></CloseIcon>
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
