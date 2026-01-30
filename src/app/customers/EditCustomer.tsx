
"use client"

import "./customers.css"
import MyTextarea from "@/components/myTextarea/myTextarea"
import MyInput from "@/components/myInput/myInput"
import MyButton from "@/components/mybutton/myButton"
import { useContext ,useState,useEffect} from "react"
import { CustomersContext } from "@/app/customers/CustomersContext"
import { getOneCustomerApi } from "@/APIs/getOneCustomerApi"
import { getAllCustomerApi } from "@/APIs/getAllCustomerApi"
import { ErrorContext } from "@/app/globalsContext/errorContext"
import { editCustomerApi } from "@/APIs/editCustomerApi"

import {LoaderContext} from "@/app/globalsContext/loaderContext"
import {SuccessContext} from "@/app/globalsContext/successContext"

export default function EditCustomer() {
  const [formData,setFormData] = useState({
    name: '',
    phone_number: '',
    location: ''
  })
    const {setEditCustomerVisible,selectedCustomer,setSelectedCustomer,setListCustomersData} = useContext(CustomersContext);
    const {setErrorCardMessage,setErrorCardVisible}=useContext(ErrorContext);



    const {setIsLoading} =  useContext(LoaderContext);
    const {setIsSuccess , setSuccessMessage} = useContext(SuccessContext);

    useEffect(()=>{
      setFormData({
        name: selectedCustomer.name,
        phone_number: selectedCustomer.phone_number,
        location: selectedCustomer.location
      })
    },[selectedCustomer])



async function editCustomerHandler(){
    setIsLoading(true);
    const result = await editCustomerApi(selectedCustomer.id,formData);
    if(result.success){
        const res = await getAllCustomerApi();
        const resOne = await getOneCustomerApi(selectedCustomer.id);
        if (res.success && resOne.success) {
          setSelectedCustomer(resOne.customer);
          setListCustomersData(res.customers);
          setEditCustomerVisible(false);
          setIsLoading(false);
          setSuccessMessage("تم تعديل بيانات الزبون بنجاح");
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


    return (
        <div className="edit-customer">
            <div className="edit-customer-form">
              <MyInput label_v="اسم الزبون" type_v="text" placeholder_v="أدخل اسم الزبون" input_v={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              <MyInput  label_v="رقم الهاتف" type_v="text" placeholder_v="أدخل رقم الهاتف" input_v={formData.phone_number} onChange={(e) => setFormData({...formData, phone_number: e.target.value})} />
              <MyTextarea  label_v="عنوان الزبون" placeholder_v="أدخل عنوان الزبون" data_v={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
              <div className="edit-customer-form-buts">
                <MyButton onClick={editCustomerHandler}>تعديل</MyButton>
                <MyButton onClick={()=>setEditCustomerVisible(false)}>الغاء</MyButton>
              </div>
            </div>
        </div>
    )
}