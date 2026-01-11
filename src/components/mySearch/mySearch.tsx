"use client"

import MyInput from "../myInput/myInput";
import "./mySearch.css";
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useState } from "react";
export default function MySearch({onSearch,onCancel}:{onSearch?: (value:string)=>void,onCancel?:()=>void}) {
    const [searchValue, setSearchValue] = useState("");
    function handleCancel(){
    if(onCancel){onCancel();}
        setSearchValue("");}
  return (
    <div className="my-search-container"> 
    <MyInput input_v={searchValue} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setSearchValue(e.target.value)}} plaseholder_v={"البحث"} ></MyInput>
    <SearchIcon style={{fontSize:"30px"}} onClick={()=>{if(onSearch){onSearch(searchValue)}}}></SearchIcon>
    <HighlightOffIcon style={{fontSize:"28px"}} onClick={handleCancel}></HighlightOffIcon>
    </div>);
}