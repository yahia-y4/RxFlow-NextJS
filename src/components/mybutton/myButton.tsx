import "./myButton.css";
export default function MyButton({onClick, children }: {onClick: ()=>void, children: string}) {
  return (
    <button className="myButton" onClick={onClick}>{children}</button>
  )}