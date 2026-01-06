import "./myButton.css";
export default function MyButton({onClick, children }) {
  return (
    <button className="myButton" onClick={onClick}>{children}</button>
  )}