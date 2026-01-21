"use client"
import MyButton from "../mybutton/myButton";
import "./errorCard.css"
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useContext } from "react";
import { ErrorContext } from "@/app/globalsContext/errorContext";

export default function ErrorCard() {
    const {ErrorCardVisible, setErrorCardVisible, ErrorCardMessage}=useContext(ErrorContext);

    if(!ErrorCardVisible){
        return null;
    }
    
    return (
        <div className="error-card-page">
            <div className="error-card-content">

                <ErrorOutlineIcon className="error-card-icon" />
                <div className="error-card-message">
                    {ErrorCardMessage}
                </div>
                <div className="error-card-close-button">
                    <MyButton  onClick={()=>setErrorCardVisible(false)}>إغلاق</MyButton>
                </div>
            </div>


        </div>
    )
}
