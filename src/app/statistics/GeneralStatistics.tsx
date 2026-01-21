 
 import "./statistics.css"
import InfoCard from "@/components/infoWindow/infoCard";
 export default function GeneralStatistics() {
    return (
        <div className="general-statistics">
            <h2>الاحصائيات العامة</h2>

            <div className="general-statistics-info-cards">
                <InfoCard description="عدد الادوية في المخزن" value={100} />
                <InfoCard description="عدد القطع في المخزن" value={1000} />
                <InfoCard description="رأس المال الكلي"  value={1000} />
                <InfoCard description="سعر البيع الكلي" value={1000} />
                <InfoCard description="صافي الارباح" value={1000} />
                <InfoCard description="الارباح المحققة" value={1000} />
                <InfoCard description="عدد الزبائن" value={1000} />
                <InfoCard description="عدد الموردين" value={1000} />
                <InfoCard description="صافي الديون الكلي" value={1000} />
                <InfoCard description="صافي المستحقات الكلي" value={1000} />
            </div>
        </div>
    )
 }