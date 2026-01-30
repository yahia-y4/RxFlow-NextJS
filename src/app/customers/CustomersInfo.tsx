 "use client"
 
 import "./customers.css"

import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import CloseIcon from '@mui/icons-material/Close';
import TextButton from "@/components/textButton/textButton";
import { useState } from "react";
import MyInput from "@/components/myInput/myInput";
import MyTextarea from "@/components/myTextarea/myTextarea";
import MyButton from "@/components/mybutton/myButton";
import { useContext } from "react"
import { CustomersContext } from "@/app/customers/CustomersContext"
import { formatDateTime } from "@/APIs/formatDateTime";
import{ErrorContext} from "@/app/globalsContext/errorContext"
import { addDebtCustomerApi } from "@/APIs/addDebtCustomerApi";
import{getOneCustomerApi} from "@/APIs/getOneCustomerApi"
import {receivePaymentCustomerApi} from "@/APIs/receivePaymentCustomerApi";
import {WarningContext} from "@/app/globalsContext/warningContext"
import {deleteCustomerApi} from "@/APIs/deleteCustomerApi"
import { getAllCustomerApi } from "@/APIs/getAllCustomerApi";



import {LoaderContext} from "@/app/globalsContext/loaderContext"
import {SuccessContext} from "@/app/globalsContext/successContext"


 export default function CustomersInfo() {
    // -----------state & context-----------//
    const {setErrorCardMessage,setErrorCardVisible} = useContext(ErrorContext);

    const {setWarningFunction,setWarningCardMessage,setWarningCardVisible} = useContext(WarningContext);

    const {setCustomerPaymentsReceivedListVisible,
        setCustomersInfoVisible,
        setEditCustomerVisible,
        CustomerPaymentsReceivedListVisible,
        setCustomerDebtsListVisible,
        CustomerDebtsListVisible,
        selectedCustomer,
        setSelectedCustomer,
        setListCustomersData
    } = useContext(CustomersContext);
  
    const [debtState,setDebtState] = useState("Adding"); // Adding / Receiving
    const [formData,setFormData] = useState({
        amount: '',
        note: ''
    });



    
    const {setIsLoading} =  useContext(LoaderContext);
    const {setIsSuccess , setSuccessMessage} = useContext(SuccessContext);
    //-------------------------------------//


//-----------handle inputs change-----------//

function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
        ...formData,
        amount: (+e.target.value),
    })
}
function handleNoteChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setFormData({
        ...formData,
        note: e.target.value,
    })
}

//-----------------------------------------//


//------------handle form submit------------//
function emptyForm(){
    setFormData({
        amount: 0,
        note: ''
    })
}

async function handleDebtFormSubmit() {
    setIsLoading(true);
    if(debtState === "Adding"){
    // Logic to add debt
    const result = await addDebtCustomerApi(selectedCustomer.id,formData);
    if(result.success){
        const res = await getOneCustomerApi(selectedCustomer.id);
        if (res.success) {
            setSelectedCustomer(res.customer);
            emptyForm();
            setIsLoading(false);
            setSuccessMessage("تمت إضافة الدين بنجاح");
            setIsSuccess(true);
        }else{
         setErrorCardMessage(res.message);
         setErrorCardVisible(true);
         setIsLoading(false);
        }


    }else{
     setErrorCardMessage(result.message);
     setErrorCardVisible(true);
        setIsLoading(false);
    }

    }else{
     // Logic to receive payment
        const result = await receivePaymentCustomerApi(selectedCustomer.id,formData);
        if(result.success){
            console.log("Payment received successfully");
            // Refresh selected customer data
            const res = await getOneCustomerApi(selectedCustomer.id);
            if (res.success) {
                setSelectedCustomer(res.customer);
                setIsLoading(false);
                setSuccessMessage("تم استلام الدفعة بنجاح");
                setIsSuccess(true);
                emptyForm();
            }else{
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
}
//-----------------------------------------//




//-------------delete customer -------------//
async function confirmDeleteCustomer() {
    // Logic to delete customer
    setIsLoading(true);
    const result = await deleteCustomerApi(selectedCustomer.id);
    const res = await getAllCustomerApi();
    if(result.success && res.success){
        setListCustomersData(res.customers);
        setIsLoading(false);
        setCustomersInfoVisible(false);
        setCustomerPaymentsReceivedListVisible(false);
        setCustomerDebtsListVisible(false);
        setSuccessMessage("تم حذف الزبون بنجاح");
        setIsSuccess(true);
    }else{
        setErrorCardMessage(result.message);
        setErrorCardVisible(true);
        setIsLoading(false);
    }
}

async function deleteCustomerHandler() {
    setWarningCardMessage("هل أنت متأكد من حذف هذا الزبون؟");
    setWarningFunction(() => confirmDeleteCustomer);
    setWarningCardVisible(true);
}

//-----------------------------------------//


    return (
        <div className="customers-info">
            <h2>تفاصيل الزبون</h2>
            <div className="customers-info-control">
                <EditSquareIcon onClick={()=>setEditCustomerVisible(true)} style={{fontSize:"30px",cursor:"pointer"}}/>
                <DeleteForeverIcon onClick={deleteCustomerHandler} style={{fontSize:"30px",cursor:"pointer"}}/>
                {/* الديون */}
                <AutoStoriesIcon onClick={()=>setCustomerDebtsListVisible(!CustomerDebtsListVisible)} style={{fontSize:"30px",cursor:"pointer"}}/> 
                {/* الدفعات المستلمة */}
                <ChecklistRtlIcon onClick={()=>setCustomerPaymentsReceivedListVisible(!CustomerPaymentsReceivedListVisible)} style={{fontSize:"30px",cursor:"pointer"}}/>

                <CloseIcon onClick={()=>{setCustomersInfoVisible(false);
                    setCustomerPaymentsReceivedListVisible(false);
                    setCustomerDebtsListVisible(false);
                }} style={{fontSize:"30px",cursor:"pointer"}}/>
            </div>

            <div className="customers-info-content">
                     <p className="one-customer-info">رقم الزبون : {selectedCustomer?.id}</p>
                     <p className="one-customer-info">اسم الزبون : {selectedCustomer?.name}</p>
                     <p className="one-customer-info">رقم الهاتف : {selectedCustomer?.phone_number}</p>
                     <p className="one-customer-info">العنوان : {selectedCustomer?.address}</p>
                     <p className="one-customer-info">تاريخ الاضافة : {formatDateTime(selectedCustomer?.createdAt)}</p>
                    {selectedCustomer.isUpdated && <p className="one-customer-info">{"معدل"}</p> }

                    { selectedCustomer.isUpdated && <p className="one-customer-info">تاريخ التحديث : {formatDateTime(selectedCustomer.updatedAt)}</p>}
                     <p className="one-customer-info">مجموع الديون : {selectedCustomer?.debts}</p>
            </div>

            <div className="debt-control-buts">
               <TextButton selected={debtState==="Adding"} onClick={()=>setDebtState("Adding")} text="اضافة دين"/>
               <TextButton selected={debtState==="Receiving"} onClick={()=>setDebtState("Receiving")} text="استلام دفعة"/>
            </div>

            <div className="debt-inputs-div" >
                <h3>{debtState === "Adding" ? "اضافة دين" : "استلام دفعة"}</h3>
                <MyInput input_v={formData.amount} label_v="المبلغ" type_v="number" onChange={handleAmountChange} plaseholder_v="0.00" onClick={()=>{}}/>
                <MyTextarea data_v={formData.note} label_v="ملاحظة" onChange={handleNoteChange}/>    
                 <div className="buts-div">
                    <MyButton onClick={handleDebtFormSubmit}> {debtState === "Adding" ? "اضافة" : "استلام"}</MyButton>
                    <MyButton onClick={emptyForm}>الغاء</MyButton>
                    </div>   

            </div>

        </div>
    )
}