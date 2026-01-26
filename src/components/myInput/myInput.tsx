import "./myInput.css";

type MyInputProps = {
  input_v: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type_v?: string;
  label_v?: string;
  plaseholder_v?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
};

export default function MyInput({
  input_v,
  label_v,
  type_v = "text",
  onChange,
  children,
  plaseholder_v,
  onClick,
}: MyInputProps) {
  return (
    <div className="myInput">
      {label_v && <label>{label_v}</label>}
      <div className="input-select-div">
        {children}
        <input
          type={type_v}
          placeholder={plaseholder_v}
          value={input_v}
          onChange={onChange}
          onClick={onClick}
        />
      </div>
    </div>
  );
}
