import InfoWindow from "@/components/infoWindow/infoCard";
import UserName from "@/components/userName/userName";
import Day from "@/components/day/day";
import Hour from "@/components/hour/hour";
import "./page.css";

export default function Home() {
  return (
    <div className="home">
    <div className="rightSide">
      <UserName userN="John Doe"/>
      <Day/>
      <Hour/>
     
    </div>
    <div className="leftSide">
      <InfoWindow description="Total Videos" value={1200}/>
      <InfoWindow description="Total Videos" value={1200}/>
      <InfoWindow description="Total Videos" value={1200}/>
      <InfoWindow description="Total Videos" value={1200}/>
    </div>
    </div>
  )

 
}
