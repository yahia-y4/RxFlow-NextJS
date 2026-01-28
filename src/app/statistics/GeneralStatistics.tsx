 "use client"
 import "./statistics.css"
import InfoCard from "@/components/infoWindow/infoCard";
import {useState , useEffect} from "react";
import { GeneralStatistics_itemsApi } from "@/APIs/GeneralStatistics_itemsApi";
import {GeneralStatistics_CustomersApi} from "@/APIs/GeneralStatistics_CustomersApi";
import {GeneralStatistics_SuppliersApi} from "@/APIs/GeneralStatistics_SuppliersApi";
 export default function GeneralStatistics() {
    const [statisticsItems, setStatisticsItems] = useState({});
    const [statisticsCustomers, setStatisticsCustomers] = useState({});
    const [statisticsSuppliers, setStatisticsSuppliers] = useState({});

    useEffect(()=>{

async function fetchStatistics(){
    const result = await GeneralStatistics_itemsApi();
    const result2 = await GeneralStatistics_CustomersApi();
    const result3 = await GeneralStatistics_SuppliersApi();

    if(result.success && result2.success && result3.success){
        setStatisticsItems(result.statistics);
        setStatisticsCustomers(result2.statistics);
        setStatisticsSuppliers(result3.statistics);
    }
}
    fetchStatistics();

    },[])

    return (
        <div className="general-statistics">
            <h2>الاحصائيات العامة</h2>

            <div className="general-statistics-info-cards">
                <InfoCard description="عدد الادوية في المخزن" value={statisticsItems?.total_items_in_storage} />
                <InfoCard description="عدد القطع في المخزن" value={statisticsItems?.total_quantity_in_storage} />
                <InfoCard description="رأس المال الكلي"  value={statisticsItems?.total_price_in_storage} />
                <InfoCard description="سعر البيع الكلي" value={statisticsItems?.total_sell_price_in_storage} />
                <InfoCard description="صافي الارباح في المخزن" value={statisticsItems?.total_profit_in_storage} />
                <InfoCard description="الارباح المحققة" value={statisticsItems?.total_out_profit} />
                <InfoCard description="المبيعات المحققة" value={statisticsItems?.total_out_sell_price} />
                <InfoCard description="صافي الربح المحقق" value={statisticsItems?.total_out_profit} />
                <InfoCard description="عدد القطع المباعة" value={statisticsItems?.total_out_quantity} />
                <InfoCard description="عدد الزبائن" value={statisticsCustomers?.total_count_Customers} />
                <InfoCard description="عدد الزبائن المدينين" value={statisticsCustomers?.count_Customers_with_debts} />
                <InfoCard description="عدد الزبائن غير المدينين" value={statisticsCustomers?.count_Customers_without_debts} />
                <InfoCard description="صافي الديون الكلي" value={statisticsCustomers?.total_debts} />
                <InfoCard description="عدد الموردين" value={statisticsSuppliers?.total_count_Suppliers} />
                <InfoCard description="عدد الموردين ذوي المستحقات" value={statisticsSuppliers?.count_Suppliers_with_payable_amount} />
                <InfoCard description="عدد الموردين معدومي المستحقات" value={statisticsSuppliers?.count_Suppliers_without_payable_amount} />
                <InfoCard description="صافي المستحقات الكلي" value={statisticsSuppliers?.total_payable_amount} />
          
    
            </div>
        </div>
    )
 }