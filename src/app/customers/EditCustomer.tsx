
"use client"

import "./customers.css"
import MyTextarea from "@/components/myTextarea/myTextarea"
import MyInput from "@/components/myInput/myInput"
import MyButton from "@/components/mybutton/myButton"



export default function EditCustomer() {
    return (
        <div className="edit-customer">
            <div className="edit-customer-form">
              <MyInput label_v="اسم الزبون" type_v="text" placeholder_v="أدخل اسم الزبون" />
              <MyInput  label_v="رقم الهاتف" type_v="text" placeholder_v="أدخل رقم الهاتف" />
              <MyTextarea  label_v="عنوان الزبون" placeholder_v="أدخل عنوان الزبون" />
              <div className="edit-customer-form-buts">
                <MyButton>تحديث</MyButton>
                <MyButton>الغاء</MyButton>
              </div>
            </div>
        </div>
    )
}