import "./myInput.css"
export default function MyInput({input_v,label_v,type_v,onChange,children,plaseholder_v}){
    return(
        <div className="myInput">
            <label htmlFor="">{label_v}</label>
            <div className="input-select-div">{children}  <input type={type_v} placeholder={plaseholder_v} value={input_v} onChange={onChange}/></div>
        </div>
    )
}