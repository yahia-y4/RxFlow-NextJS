import "./myTextarea.css"

export default function MyTextarea({label_v,data_v,onChange}: {label_v: string,data_v: string,onChange:(e: React.ChangeEvent<HTMLTextAreaElement>)=>void}) {
  return (
    <div className="My-Textarea">
      <label>{label_v}</label>
      <textarea value={data_v} onChange={onChange}></textarea>
    </div>
  )
}
