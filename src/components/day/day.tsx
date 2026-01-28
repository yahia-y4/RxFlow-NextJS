import "./day.css";
export default function Day({date}: {date?: string}) {
  return ( 
    <div className="day-container">
      <p className="day-text">{date}</p>
    </div>
   );
}   