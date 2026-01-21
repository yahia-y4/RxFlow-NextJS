import "./statistics.css"

import GeneralStatistics from "./GeneralStatistics"
import StatisticsTable from "./StatisticsTable"
export default function Statistics() {
    return (
        <div className="statistics-page">
            <GeneralStatistics/>
            <StatisticsTable/>
        </div>
    )
}