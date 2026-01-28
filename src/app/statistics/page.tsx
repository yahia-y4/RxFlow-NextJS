"use client"

import "./statistics.css"

import GeneralStatistics from "./GeneralStatistics"
import StatisticsTable from "./StatisticsTable"
import { useContext,useEffect } from "react"
import{SelectedPageContext} from "@/app/globalsContext/selectedPageContext"
export default function Statistics() {
    const {setSelectedPage}=useContext(SelectedPageContext);
  
  useEffect(()=>{
    setSelectedPage("الإحصائيات");
  },[])


    return (
        <div className="statistics-page">
            <GeneralStatistics/>
            <StatisticsTable/>
        </div>
    )
}