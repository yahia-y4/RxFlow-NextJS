"use client"
import "./suppliers.css"
import MyTable from "@/components/myTable/myTable";
import {useState} from "react"
import {getPaymentSentHistorySupplier} from "@/APIs/getPaymentSentHistorySupplier"
import { useEffect,useContext } from "react";
import { SuppliersContext } from "@/app/suppliers/suppliersContext";
import { formatDateTime } from "@/APIs/formatDateTime";
export default function SuppliersPaymentsList() {
    const [PaymentsListData,setPaymentsListData] = useState([])
    const {selectedSupplier,} = useContext(SuppliersContext);
    console.log(selectedSupplier)
    useEffect(()=>{
        async function fetchPaymentsList(){
            const response = await getPaymentSentHistorySupplier(selectedSupplier.id); // هنا 1 هو معرف المورد كمثال
            if(response.success){
                const formattedData = response.data.map((payment:any) => ({
                    ...payment,
                    payment_date: formatDateTime(payment.payment_date)
                }));
                setPaymentsListData(formattedData);
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