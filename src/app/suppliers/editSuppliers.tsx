"use client"
import "./suppliers.css"
import MyInput from "@/components/myInput/myInput"
import MyTextarea from "@/components/myTextarea/myTextarea"
import MyButton from "@/components/mybutton/myButton"
import { useContext,useState,useEffect } from "react"
import { SuppliersContext } from "@/app/suppliers/suppliersContext";
import { editSupplierApi } from "@/APIs/editSupplierApi"
import { ErrorContext } from "../globalsContext/errorContext"
import { getOneSupplierApi } from "@/APIs/getOneSupplierApi"
import { getSuppliersApi } from "@/APIs/getSuppliersApi"
import {LoaderContext} from "@/app/globalsContext/loaderContext"
import {SuccessContext} from "@/app/globalsContext/successContext"
export default function EditSuppliers() {
const {setEditSupplierVisible,selectedSupplier,setSelectedSupplier,setSuppliers} = useContext(SuppliersContext);
const {setErrorCardMessage,setErrorCardVisible} = useContext(ErrorContext)
const {setIsLoading} = useContext(LoaderContext)
const {setIsSuccess,setSuccessMessage} = useContext(SuccessContext)
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
    setIsLoading(true)
const response = await editSupplierApi(selectedSupplier.id,editSupplierData)
const suppDetails = await getOneSupplierApi(selectedSupplier.id)
const supps = await getSuppliersApi()

if(response.success && suppDetails.success && supps.success){
    
 setSelectedSupplier(suppDetails.supplier)
 setSuppliers(supps.suppliers)
setEditSupplierVisible(false)
setIsLoading(false)
setSuccessMessage("تم تعديل المورد بنجاح")
setIsSuccess(true)

}else{
    setErrorCardMessage(response.message)
    setErrorCardVisible(true)
    setIsLoading(false)
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