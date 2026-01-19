import "./myTextarea.css"

export default function MyTextarea({label_v,data_v}: {label_v: string,data_v: string}) {
  return (
    <div className="My-Textarea">
      <label>{label_v}</label>
      <textarea>{data_v}</textarea>
    </div>
  )
}
