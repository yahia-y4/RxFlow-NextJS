"use client"


import "./customers.css"
import { useState } from "react"
import MyTable from "@/components/myTable/myTable"
import MySearch from "@/components/mySearch/mySearch"

export default function CustomersList() {
    const [ListCustomersData,setListCustomersData] = useState([
        {id:1,name:"زبون 1",num:"123456789"},
        {id:2,name:"زبون 2",num:"987654321"},
        {id:3,name:"زبون 3",num:"456789123"},
    ])
    const columns = [
        { key: "id", title: "ID" },
        { key: "name", title: "اسم الزبون" },
        {key:"num",title:"رقم الهاتف"} 
    ]
    return (
        <div className="customers-list">
            <h2>قائمة الزبائن</h2>
            <MySearch/>
            <div className="ListCustomers-table">
                <MyTable columns={columns} data={ListCustomersData} ></MyTable>
            </div>

        </div>
    )
}