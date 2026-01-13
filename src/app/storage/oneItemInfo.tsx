import "./storage.css"
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { StorageContext } from "./storageContext"
import { useContext } from "react"
export default function OneItemInfo() {
    const {setEditItemVisible} = useContext(StorageContext);
  return (
    <div className="one-item-info-page">
        <div className="one-item-info-top-buts">
            <EditSquareIcon onClick={() => setEditItemVisible(true)} style={{fontSize:"30px",cursor:"pointer"}}></EditSquareIcon>
            <DeleteForeverIcon style={{fontSize:"30px",cursor:"pointer"}}></DeleteForeverIcon>

        </div>
         <div className="one-item-info-container">
            <p>اسم الدواء:</p>
            <p>الشركة:</p>
            <p>الشكل:</p>
            <p>السعر:</p>
            <p>الكمية المتوفرة:</p>
         </div>
    </div>

  );
}