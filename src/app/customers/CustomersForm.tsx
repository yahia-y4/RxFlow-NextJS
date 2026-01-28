
import "./customers.css"
import MyTextarea from "@/components/myTextarea/myTextarea"
import MyButton from "@/components/mybutton/myButton"
import MyInput from "@/components/myInput/myInput"
import {addCustomerApi} from "@/APIs/addCustomerApi"
import { useState,useContext } from "react"
import {ErrorContext} from "@/app/globalsContext/errorContext"
/* ================== Component ================== */
 export default function CustomersForm() {
  const [customerData,setCustomerData] = useState({
    name: '',
    location: '',
    phone_number: '',
  });


const {setErrorCardMessage,setErrorCardVisible} = useContext(ErrorContext);

  // ------------handle inputs change------------//
  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCustomerData({
      ...customerData,
      name: e.target.value,
    })
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCustomerData({
      ...customerData,
      phone_number: e.target.value,
    })
  }
  function handleLocationChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setCustomerData({
      ...customerData,
      location: e.target.value,
    })
  }

  //---------------------------------------------//


  //------------handle form submit------------//

async function addCustomerHandler() {
const result = await addCustomerApi(customerData);
if(result.success){
  console.log("Customer added successfully", result);
emptyForm();
}else{
setErrorCardMessage(result.message);
setErrorCardVisible(true);
}
  }

  function emptyForm(){
    setCustomerData({
      name: '',
      location: '',
      phone_number: '',
    })
  }

    return (
      <div className="customers-form">
        <MyInput input_v={customerData.name} onChange={handleNameChange} label_v={"اسم الزبون"} />
        <MyInput input_v={customerData.phone_number} onChange={handlePhoneChange} label_v={"رقم الهاتف"} />
        <MyTextarea data_v={customerData.location} onChange={handleLocationChange} label_v={"عنوان الزبون"} />
      <div className="customers-form-buts">
        <MyButton onClick={addCustomerHandler}>إضافة</MyButton>
        <MyButton onClick={emptyForm}>الغاء</MyButton>
      </div>
      </div>
    )
  }