import "./mySelect.css";
export default function MySelect({ options_v=[],onChange,value_v}) {
   const options = options_v.map((option, index) => (
    <option value={option} key={index}> {option}</option>
     

  ));
  return (<select className="mySelect" onChange={onChange} value={value_v}>
    {options}
  </select>)}