import "./mySelect.css";
export default function MySelect({ options_v=[] }) {
   const options = options_v.map((option, index) => (
    <option key={index}> {option}</option>
     

  ));
  return (<select className="mySelect">
    {options}
  </select>)}