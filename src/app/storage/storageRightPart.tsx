
"use client"
import MyButton from "@/components/mybutton/myButton"
import MyInput from "@/components/myInput/myInput"
import MySelect from "@/components/mySelect/mySelect"
import { useState } from "react"

export default function StorageRightPart() {  
    const [formItemData, setFormItemData] = useState({})
  return(
    <div className="storageRightPart">
     <div className="topButsRightStorage"></div>
     <form action="" className="formStorage">
     <MyInput label_v={"الاسم التجاري"}></MyInput>
     <MyInput label_v={"اسم الشركة"}></MyInput>
     <p>الشكل الصيدلاني</p>
     <MySelect options_v={["1", "2", "3"]}></MySelect>
        <MyInput label_v={"التركيز"}>
            <MySelect options_v={["mg", "ml", "g"]}></MySelect>
        </MyInput>
        <MyInput label_v={"العيار"}>
            <MySelect options_v={["mg", "ml", "g"]}></MySelect>
        </MyInput>
        <MyInput label_v={"العبوة"}>
            <MySelect options_v={["علبة", "قنينة", "شريط"]}></MySelect>
        </MyInput>
        <MyInput label_v={"الكمية"} type_v={"number"}></MyInput>
        <MyInput label_v={"سعر الشراء"} type_v={"number"}></MyInput>
        <MyInput label_v={"نسبة الربح %"} type_v={"number"}></MyInput>
        <MyInput label_v={"الباركود"}></MyInput>
        <MyInput label_v={"تاريخ الانتهاء"} type_v={"date"}></MyInput>
        <div className="item-form-buts">
            <MyButton>اضافة الى المخزن</MyButton>
            <MyButton>مسح البيانات</MyButton>
        </div>
     </form>
    </div>
  )
}