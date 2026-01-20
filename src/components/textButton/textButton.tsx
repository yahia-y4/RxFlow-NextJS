import "./textButton.css"

export default function TextButton({text,selected,onClick}:{text:string,selected?:boolean,onClick?:()=>void}){
    return (
        <div className={`text-button ${selected ? "textButton-selected" : ""}`} onClick={onClick}>{text}</div>
    )
}