"use client"
import "./statistics.css"
import TextButton from "@/components/textButton/textButton"
import MyTable from "@/components/myTable/myTable"
import { useState,useEffect,useContext } from "react"
import{TopSellingBySalesApi} from "@/APIs/TopSellingBySalesApi"
import{LowSellingBySalesApi} from "@/APIs/lowSellingBySalesApi"
import { truncateToTwoDecimals } from "@/APIs/truncateToTwoDecimals"

import {LoaderContext} from "@/app/globalsContext/loaderContext"
import {SuccessContext} from "@/app/globalsContext/successContext"
export default function StatisticsTable() {
    const [statisticState,setStatisticState]=useState("mostSold") // mostSold | leastSold 
    const columns = [
        {key:"name",title:"الاسم"},
        {key:"company",title:"الشركة"},
        {key:"form",title:"الشكل"},
        {key:"availableQuantity",title:"الكمية المتوفرة"},
        {key:"soldQuantity",title:"كمية القطع المبيعة"},
        {key:"price",title:"سعر المبيع الحالي"},
        {key:"totalSales",title:"إجمالي المبيعات"},
        {key:"totalProfit",title:" إجمالي الارباح"},
    
    ]
    const [data,setData]=useState([])

    
    const {setIsLoading} = useContext(LoaderContext);
    const {setIsSuccess , setSuccessMessage} = useContext(SuccessContext);

useEffect(()=>{


    async function fetchStatistics (){
        setIsLoading(true);
        if(statisticState==="mostSold"){
            //call most sold api
            const result = await TopSellingBySalesApi();
            if(result.success){
                const dataFormatted = result.statistics.map((item0:object)=>({
                    name:item0.Item.name,
                    company:item0.Item.company,
                    form:item0.Item.form,
                    availableQuantity:item0.Item.quantity,
                    soldQuantity:item0.quantity,
                    price:truncateToTwoDecimals(item0.Item.price) + " $ ",
                    totalSales:truncateToTwoDecimals(item0.sales) + " $ ",
                    totalProfit:truncateToTwoDecimals(item0.profit) + " $ ",
                    
                }))
                setData(dataFormatted);
                setIsLoading(false);
            }else{
                setIsLoading(false);
            }
        }else if(statisticState==="leastSold"){
            //call least sold api
            const result = await LowSellingBySalesApi();
            if(result.success){
                const dataFormatted = result.statistics.map((item0:object)=>({
                    name:item0.Item.name,
                    company:item0.Item.company,
                    form:item0.Item.form,
                    availableQuantity:item0.Item.quantity,
                    soldQuantity:item0.quantity,
                    price: truncateToTwoDecimals(item0.Item.price) + " $ ",
                    totalSales: truncateToTwoDecimals(item0.sales) + " $ ",
                    totalProfit: truncateToTwoDecimals(item0.profit) + " $ ",
                }))
                setData(dataFormatted);
                setIsLoading(false);
            }else{
                setIsLoading(false);
            }
        } 


}
    fetchStatistics();
},[statisticState])


    return (
        <div className="statistics-table-compo">
           <div className="statistics-table-control">
               <TextButton text="الاكثر مبيعا" selected={statisticState==="mostSold"} onClick={()=>setStatisticState("mostSold")}/>
               <TextButton text="الاقل مبيعا" selected={statisticState==="leastSold"} onClick={()=>setStatisticState("leastSold")}/>
        
           </div>

           <div className="statistics-table-div">
                <MyTable columns={columns} data={data} />

           </div>
        </div>
    )
}