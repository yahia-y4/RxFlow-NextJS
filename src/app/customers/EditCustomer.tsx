
"use client"

import "./customers.css"
import MyTextarea from "@/components/myTextarea/myTextarea"
import MyInput from "@/components/myInput/myInput"
import MyButton from "@/components/mybutton/myButton"
import { useContext } from "react"
import { CustomersContext } from "@/app/customers/CustomersContext"


export default function EditCustomer() {
    const {setEditCustomerVisible} = useContext(CustomersContext);
    return (
        <div className="edit-customer">
            <div className="edit-customer-form">
              <MyInput label_v="اسم الزبون" type_v="text" placeholder_v="أدخل اسم الزبون" />
              <MyInput  label_v="رقم الهاتف" type_v="text" placeholder_v="أدخل رقم الهاتف" />
              <MyTextarea  label_v="عنوان الزبون" placeholder_v="أدخل عنوان الزبون" />
              <div className="edit-customer-form-buts">
                <MyButton onClick={()=>setEditCustomerVisible(false)}>تحديث</MyButton>
                <MyButton onClick={()=>setEditCustomerVisible(false)}>الغاء</MyButton>
              </div>
            </div>
        </div>
    )
}