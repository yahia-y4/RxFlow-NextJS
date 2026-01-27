"use client"
import "./suppliers.css"
import MyInput from "@/components/myInput/myInput"
import MyTextarea from "@/components/myTextarea/myTextarea"
import MyButton from "@/components/mybutton/myButton"
import { useContext,useState,useEffect } from "react"
import { SuppliersContext } from "@/app/suppliers/suppliersContext";
import { editSupplierApi } from "@/APIs/editSupplierApi"
import { ErrorContext } from "../globalsContext/errorContext"
export default function EditSuppliers() {
const {setEditSupplierVisible,selectedSupplier} = useContext(SuppliersContext);
const {setErrorCardMessage,setErrorCardVisible} = useContext(ErrorContext)
const [editSupplierData,setEditSupplierData] = useState({
    name:"",
    phone_number:"",
    location:"",
    warehouse_name:"",
})

useEffect(()=>{
    setEditSupplierData({
    name:selectedSupplier.name,
    phone_number:selectedSupplier.phone_number,
    location:selectedSupplier.location,
    warehouse_name:selectedSupplier.warehouse_name,
    })
},[selectedSupplier])

// ------ handle inputs ------


  function handleNameChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setEditSupplierData({ ...editSupplierData, name: e.target.value });
  }
  function handlePhoneNumberChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setEditSupplierData({ ...editSupplierData, phone_number: e.target.value });
  }
  function handleWarehouse_nameChange(e: React.ChangeEvent<HTMLTextAreaElement>){
    setEditSupplierData({...editSupplierData,warehouse_name: e.target.value})
  }
  function handleLocationChange(e: React.ChangeEvent<HTMLTextAreaElement>){
    setEditSupplierData({...editSupplierData,location:e.target.value})
  }
  

//----------------------------


// handle submit -----

async function editClick(){
const response = await editSupplierApi(selectedSupplier.id,editSupplierData)
if(response.success){
setEditSupplierVisible(false)

}else{
    setErrorCardMessage(response.message)
    setErrorCardVisible(true)
}
} 

//-------------------

    return (
        <div className="editSupplier-page">
            <div className="editSupplier-form">

                <MyInput input_v={editSupplierData.name} onChange={handleNameChange} label_v={"اسم المورد"}></MyInput>
                <MyInput input_v={editSupplierData.phone_number} onChange={handlePhoneNumberChange} label_v={"رقم الهاتف"}></MyInput>
                <MyInput input_v={editSupplierData.warehouse_name} onChange={handleWarehouse_nameChange} label_v={"اسم المسنودع"}></MyInput>
                <MyTextarea data_v={editSupplierData.location} onChange={handleLocationChange} label_v={"العنوان"}></MyTextarea>
                <div className="editSupplier-buts">
                    <MyButton onClick={editClick}>تعديل</MyButton>
                    <MyButton onClick={()=>setEditSupplierVisible(false)}>إلغاء</MyButton>
                </div>
            </div>
         
        </div>
    )
}