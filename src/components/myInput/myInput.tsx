import "./myInput.css"
export default function MyInput({ input_v, label_v, type_v, onChange, children, plaseholder_v, onClick }: { input_v: string, label_v: string, type_v: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, children: React.ReactNode, plaseholder_v: string, onClick: () => void }) {
    return (
        <div className="myInput">
            <label htmlFor="">{label_v}</label>
            <div className="input-select-div">{children}  <input onChange={onChange} type={type_v} placeholder={plaseholder_v} value={input_v}  /></div>
        </div>
    )
}