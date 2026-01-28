"use client";

import InfoWindow from "@/components/infoWindow/infoCard";
import AppName from "@/components/appName/appName";
import Day from "@/components/day/day";
import { useState,useEffect,useContext } from "react";
import{getCurrentDateArabicIntl} from "@/APIs/getDate";
import { GeneralStatistics_itemsApi } from "@/APIs/GeneralStatistics_itemsApi";
import {GeneralStatistics_CustomersApi} from "@/APIs/GeneralStatistics_CustomersApi";
import {GeneralStatistics_SuppliersApi} from "@/APIs/GeneralStatistics_SuppliersApi";
import{SelectedPageContext} from "@/app/globalsContext/selectedPageContext"


import "./page.css";

export default function Home() {
    const {setSelectedPage}=useContext(SelectedPageContext);
    
    useEffect(()=>{
      setSelectedPage("الرئيسية");
    },[])
  

  const [currentDate, setCurrentDate] = useState("");
  const [itemsCount, setItemsCount] = useState(0);
  const [piecesCount, setPiecesCount] = useState(0);
  const [customersCount, setCustomersCount] = useState(0);
  const [suppliersCount, setSuppliersCount] = useState(0);


  useEffect(() => {
    const date = getCurrentDateArabicIntl();
    setCurrentDate(date);

    async function fetchStatistics(){
      const result = await GeneralStatistics_itemsApi();
      const result2 = await GeneralStatistics_CustomersApi();
      const result3 = await GeneralStatistics_SuppliersApi();
  
      if(result.success && result2.success && result3.success){
      
          setItemsCount(result.statistics?.total_items_in_storage || 0);
          setPiecesCount(result.statistics?.total_quantity_in_storage || 0);
          setCustomersCount(result2.statistics?.total_count_Customers || 0);
          setSuppliersCount(result3.statistics?.total_count_Suppliers || 0);
      }
  }
      fetchStatistics();
  }, []);

  return (
    <div className="home">
    <div className="rightSide">
      <AppName userN="RxFlow"/>
      <Day date={currentDate}/>
   
     
    </div>
    <div className="leftSide">
      <InfoWindow description="عدد الادوية في المخزن" value={itemsCount}/>
      <InfoWindow description="عدد القطع في المخزن" value={piecesCount}/>
     <InfoWindow description="عدد الموردين" value={suppliersCount}/>
      <InfoWindow description="عدد الزبائن" value={customersCount}/>
    </div>
    </div>
  )

 
}
