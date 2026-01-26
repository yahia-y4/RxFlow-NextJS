import "./mySelect.css";

type Option = {
  value: string;
  label: string;
};

type MySelectProps = {
  options_v: Option[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value_v: string;
  placeholder?: string; // ← جديد
};

export default function MySelect({
  options_v,
  onChange,
  value_v,
  placeholder,
}: MySelectProps) {
  return (
    <select className="mySelect" onChange={onChange} value={value_v}>
      {placeholder && (
        <option value="">{placeholder}</option>
      )}

      {options_v.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
