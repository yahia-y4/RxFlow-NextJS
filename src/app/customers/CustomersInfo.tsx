 "use client"
 
 import "./customers.css"

import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import CloseIcon from '@mui/icons-material/Close';
import TextButton from "@/components/textButton/textButton";
import { useState } from "react";
import MyInput from "@/components/myInput/myInput";
import MyTextarea from "@/components/myTextarea/myTextarea";
import MyButton from "@/components/mybutton/myButton";
 export default function CustomersInfo() {
    const [debtState,setDebtState] = useState("Adding"); // Adding / Receiving
    return (
        <div className="customers-info">
            <h2>تفاصيل الزبون</h2>
            <div className="customers-info-control">
                <EditSquareIcon style={{fontSize:"30px",cursor:"pointer"}}/>
                <DeleteForeverIcon style={{fontSize:"30px",cursor:"pointer"}}/>
                {/* الديون */}
                <AutoStoriesIcon style={{fontSize:"30px",cursor:"pointer"}}/> 
                {/* الدفعات المستلمة */}
                <ChecklistRtlIcon style={{fontSize:"30px",cursor:"pointer"}}/>

                <CloseIcon style={{fontSize:"30px",cursor:"pointer"}}/>
            </div>

            <div className="customers-info-content">
                     <p className="one-customer-info">اسم الزبون : {"فلان"}</p>
                     <p className="one-customer-info">رقم الهاتف : {"456789"}</p>
                     <p className="one-customer-info">العنوان : {"ghg hsgdhhs jkhskjsh"}</p>
                     <p className="one-customer-info">تاريخ الاضافة : {"10/1/2019"}</p>
                     <p className="one-customer-info">تاريخ التحديث : {""}</p>
                     <p className="one-customer-info">{"معدل"}</p>
                     <p className="one-customer-info">مجموع الديون : {"200$"}</p>
            </div>

            <div className="debt-control-buts">
               <TextButton selected={debtState==="Adding"} onClick={()=>setDebtState("Adding")} text="اضافة دين"/>
               <TextButton selected={debtState==="Receiving"} onClick={()=>setDebtState("Receiving")} text="استلام دفعة"/>
            </div>

            <div className="debt-inputs-div" >
                <h3>{debtState === "Adding" ? "اضافة دين" : "استلام دفعة"}</h3>
                <MyInput input_v="" label_v="المبلغ" type_v="number" onChange={()=>{}} plaseholder_v="0.00" onClick={()=>{}}/>
                <MyTextarea label_v="ملاحظة"/>    
                 <div className="buts-div">
                    <MyButton>{debtState === "Adding" ? "اضافة" : "استلام"}</MyButton>
                    <MyButton>الغاء</MyButton>
                    </div>   

            </div>

        </div>
    )
}