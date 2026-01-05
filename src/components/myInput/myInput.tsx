import "./myInput.css"
export default function MyInput({input_v,label_v,type_v,onChange,children}){
    return(
        <div className="myInput">
            <label htmlFor="">{label_v}</label>
            <input type={type_v} value={input_v}/>
        </div>
    )
}