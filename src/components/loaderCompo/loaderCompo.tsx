
"use client"
import "./loaderCompo.css"
import {LoaderContext} from "@/app/globalsContext/loaderContext"
import { useContext } from "react";
export default function LoaderCompo() {

    const {isLoading} =  useContext(LoaderContext);

    if (!isLoading) {
        return null;
    }

    return (
        <div className="loader-container">
            <div className="loader"></div>
        </div>
    )
}