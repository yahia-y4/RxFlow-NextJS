"use client"
import "./suppliers.css"
import MyTable from "@/components/myTable/myTable";
import {useState} from "react"
import {getPaymentSentHistorySupplier} from "@/APIs/getPaymentSentHistorySupplier"
import { useEffect,useContext } from "react";
import { SuppliersContext } from "@/app/suppliers/suppliersContext";
import { formatDateTime } from "@/APIs/formatDateTime";

import {LoaderContext} from "@/app/globalsContext/loaderContext"
import {SuccessContext} from "@/app/globalsContext/successContext"

export default function SuppliersPaymentsList() {
    const [PaymentsListData,setPaymentsListData] = useState([])
    const {selectedSupplier,} = useContext(SuppliersContext);

    const {setIsLoading} =  useContext(LoaderContext);
    const {setIsSuccess , setSuccessMessage} = useContext(SuccessContext);

    useEffect(()=>{
        async function fetchPaymentsList(){
            setIsLoading(true);
            const response = await getPaymentSentHistorySupplier(selectedSupplier.id); 
            if(response.success){
                const formattedData = response.data.map((payment:any) => ({
                    ...payment,
                    payment_date: formatDateTime(payment.payment_date)
                }));
                setPaymentsListData(formattedData);
                setIsLoading(false);
            }
        }
        fetchPaymentsList();
    },[])
     const columns = [
        { key: "id", title: "ID" },
        { key: "amount", title: "المبلغ المدفوع" },
        {key:"payment_date",title:"تاريخ الدفعة"},
        {key:"note",title:"ملاحظة"} 
    ]
    return (
        <div className="Suppliers-payments-list">
            <h2> قائمة المدفوعات للمورد : {selectedSupplier.name}</h2>
            <div className="Suppliers-payments-list-table">
                <MyTable columns={columns} data={PaymentsListData}/>
            </div>
        </div>
    )
}