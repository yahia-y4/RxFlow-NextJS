"use client"
import "./suppliers.css"
import MyInput from "@/components/myInput/myInput"
import MyTextarea from "@/components/myTextarea/myTextarea"
import MyButton from "@/components/mybutton/myButton"
import { useContext } from "react"
import { SuppliersContext } from "@/app/suppliers/suppliersContext";
export default function EditSuppliers() {
const {setEditSupplierVisible} = useContext(SuppliersContext);

    return (
        <div className="editSupplier-page">
            <div className="editSupplier-form">

                <MyInput label_v={"اسم المورد"}></MyInput>
                <MyInput label_v={"رقم الهاتف"}></MyInput>
                <MyInput label_v={"اسم المسنودع"}></MyInput>
                <MyTextarea label_v={"العنوان"}></MyTextarea>
                <div className="editSupplier-buts">
                    <MyButton onClick={()=>setEditSupplierVisible(false)}>تعديل</MyButton>
                    <MyButton onClick={()=>setEditSupplierVisible(false)}>إلغاء</MyButton>
                </div>
            </div>
         
        </div>
    )
}