
import "./customers.css"
import MyTextarea from "@/components/myTextarea/myTextarea"
import MyButton from "@/components/mybutton/myButton"
import MyInput from "@/components/myInput/myInput"
 export default function CustomersForm() {
    return (
      <div className="customers-form">
        <MyInput label_v={"اسم الزبون"} />
        <MyInput label_v={"رقم الهاتف"} />
        <MyTextarea label_v={"عنوان الزبون"} />
      <div className="customers-form-buts">
        <MyButton>إضافة</MyButton>
        <MyButton>الغاء</MyButton>
      </div>
      </div>
    )
  }