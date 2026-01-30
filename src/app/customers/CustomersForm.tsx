
import "./customers.css"
import MyTextarea from "@/components/myTextarea/myTextarea"
import MyButton from "@/components/mybutton/myButton"
import MyInput from "@/components/myInput/myInput"
import {addCustomerApi} from "@/APIs/addCustomerApi"
import { useState,useContext } from "react"
import {ErrorContext} from "@/app/globalsContext/errorContext"
import { CustomersContext } from "@/app/customers/CustomersContext"
import { getAllCustomerApi } from "@/APIs/getAllCustomerApi"


import {LoaderContext} from "@/app/globalsContext/loaderContext"
import {SuccessContext} from "@/app/globalsContext/successContext"

 export default function CustomersForm() {
  const [customerData,setCustomerData] = useState({
    name: '',
    location: '',
    phone_number: '',
  });


const {setErrorCardMessage,setErrorCardVisible} = useContext(ErrorContext);
const {setListCustomersData} = useContext(CustomersContext);



    const {setIsLoading} =  useContext(LoaderContext);
    const {setIsSuccess , setSuccessMessage} = useContext(SuccessContext);

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
    setIsLoading(true);
const result = await addCustomerApi(customerData);
if(result.success){
    const res = await getAllCustomerApi();
    if (res.success) {
      setListCustomersData(res.customers);
      emptyForm();
      setIsLoading(false);
      setSuccessMessage("تمت إضافة الزبون بنجاح");
      setIsSuccess(true);

    }else {
      setErrorCardMessage(res.message);
      setErrorCardVisible(true);
      setIsLoading(false);
    }
}else{
setErrorCardMessage(result.message);
setErrorCardVisible(true);
setIsLoading(false);
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