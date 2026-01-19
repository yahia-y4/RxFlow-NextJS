
import "./suppliers.css"
import MyInput from "@/components/myInput/myInput"
import MyTextarea from "@/components/myTextarea/myTextarea"
import MyButton from "@/components/mybutton/myButton"
export default function EditSuppliers() {
    return (
        <div className="editSupplier-page">
            <div className="editSupplier-form">

                <MyInput label_v={"اسم المورد"}></MyInput>
                <MyInput label_v={"رقم الهاتف"}></MyInput>
                <MyInput label_v={"اسم المسنودع"}></MyInput>
                <MyTextarea label_v={"العنوان"}></MyTextarea>
                <div className="editSupplier-buts">
                    <MyButton>تعديل</MyButton>
                    <MyButton>إلغاء</MyButton>
                </div>
            </div>
         
        </div>
    )
}