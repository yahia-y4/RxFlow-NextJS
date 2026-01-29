"use client";

import "./successCard.css";
import {SuccessContext} from "@/app/globalsContext/successContext"
import { useContext } from "react";
export default function SuccessCard() {
    const {isSuccess, setIsSuccess} =  useContext(SuccessContext);

    if (!isSuccess) {
        return null;
    }
    function closeCard() {
        setTimeout(() => {
            setIsSuccess(false);
        }, 2000); 
    }
    closeCard();
    
    return (
        <div className="success-container">
            <div className="success-message">
                تمت العملية بنجاح!
            </div>
        </div>
    );
}