"use client"
import "./warning.css"
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useContext } from "react";
import { WarningContext } from "@/app/globalsContext/warningContext";
import MyButton from "../mybutton/myButton";

export default function WarningCard() {
    const {WarningCardVisible, setWarningCardVisible, WarningCardMessage, WarningFunction}=useContext(WarningContext);
    
    if(!WarningCardVisible){
        return null;
    }

    return (
        <div className="warning-card-page">
            <div className="warning-card-content">
                <WarningAmberIcon/>
                <p>{WarningCardMessage}</p>

                <div className="warning-card-buttons">
             
             <MyButton onClick={()=>setWarningCardVisible(false)}>إلغاء</MyButton>
             <MyButton onClick={()=>{WarningFunction();
                setWarningCardVisible(false)}}>تاكيد</MyButton>
                 </div>

            </div>
            
        </div>
    )
}
