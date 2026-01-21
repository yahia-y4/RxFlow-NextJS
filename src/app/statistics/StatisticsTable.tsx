"use client"
import "./statistics.css"
import TextButton from "@/components/textButton/textButton"
import MyTable from "@/components/myTable/myTable"
import { useState } from "react"
export default function StatisticsTable() {
    const [statisticState,setStatisticState]=useState("mostSold") // mostSold | leastSold | lowStock | highStock | zeroStock | nearExpiry | expired
    const columns = [
        {key:"id",title:"id"},
        {key:"name",title:"الاسم"},
        {key:"company",title:"الشركة"},
        {key:"form",title:"الشكل"},
        {key:"availableQuantity",title:"الكمية المتوفرة"},
        {key:"soldQuantity",title:"الكمية المبيعة"},
        {key:"price",title:"سعر القطعة"},
    
    ]
    const [data,setData]=useState([
        {id:1,name:"عنصر 1",company:"شركة 1",form:"شكل 1",availableQuantity:10,soldQuantity:5,price:100},
        {id:2,name:"عنصر 2",company:"شركة 2",form:"شكل 2",availableQuantity:20,soldQuantity:10,price:200},
        {id:3,name:"عنصر 3",company:"شركة 3",form:"شكل 3",availableQuantity:30,soldQuantity:15,price:300},
    ])

    return (
        <div className="statistics-table-compo">
           <div className="statistics-table-control">
               <TextButton text="الاكثر مبيعا" selected={statisticState==="mostSold"} onClick={()=>setStatisticState("mostSold")}/>
               <TextButton text="الاقل مبيعا" selected={statisticState==="leastSold"} onClick={()=>setStatisticState("leastSold")}/>
               <TextButton text="عدد القطع قليلة" selected={statisticState==="lowStock"} onClick={()=>setStatisticState("lowStock")}/>
               <TextButton text="عدد القطع كثيرة" selected={statisticState==="highStock"} onClick={()=>setStatisticState("highStock")}/>
               <TextButton text="عدد القطع صفر" selected={statisticState==="zeroStock"} onClick={()=>setStatisticState("zeroStock")}/>
               <TextButton text="تقترب من انتهاء الصلاحية" selected={statisticState==="nearExpiry"} onClick={()=>setStatisticState("nearExpiry")}/>
               <TextButton text="منتهية الصلاحية" selected={statisticState==="expired"} onClick={()=>setStatisticState("expired")}/>
           </div>

           <div className="statistics-table-div">
                <MyTable columns={columns} data={data} />

           </div>
        </div>
    )
}