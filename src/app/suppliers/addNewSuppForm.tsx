"use client"


import "./suppliers.css"
import MyInput from "@/components/myInput/myInput"
import MyTextarea from "@/components/myTextarea/myTextarea"
import MyButton from "@/components/mybutton/myButton"
export default function AddNewSuppForm() {
  return (
    <form className="Add-New-Supp-Form">
      
     <MyInput label_v={"اسم المورد"}></MyInput>
     <MyInput label_v={"رقم الهاتف"}></MyInput>
     <MyInput label_v={"اسم المسنودع"}></MyInput>
     <MyTextarea label_v={"العنوان"}></MyTextarea>
     <div className="Add-New-Supp-Form-buts"> 
      <MyButton>إضافة</MyButton>
      <MyButton>إلغاء</MyButton>
     </div>
    
    </form>
  )
}