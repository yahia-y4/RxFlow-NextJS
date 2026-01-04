import "./infoCard.css";
type Props = {
    description:string,
    value:number
    
};
export default function InfoCard({description, value}:Props) {   
    return(
        <div className="info-card">
            <p className="description">{description}</p>
            <p className="value">{value}</p>
        </div>
    )
   }