"use client"
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import AssessmentIcon from '@mui/icons-material/Assessment';
import Link from "next/link";
import "./navbar.css";
import{SelectedPageContext} from "@/app/globalsContext/selectedPageContext"
import {useContext} from "react"
export default function Navbar() {
  const {selectedPage}=useContext(SelectedPageContext);
  return (
    <nav>
    <Link className={`nav-link ${selectedPage === "الرئيسية" ? "selected" : ""}`} href="/"><PersonalVideoIcon /></Link>
    <Link className={`nav-link ${selectedPage === "المخزن" ? "selected" : ""}`} href="/storage"><ArrowCircleDownIcon /></Link>
    <Link className={`nav-link ${selectedPage === "البيع" ? "selected" : ""}`} href="/sale"><ArrowCircleUpIcon /></Link>
    <Link className={`nav-link ${selectedPage === "" ? "selected" : ""}`} href="/purchaseInvoice"><ReceiptLongIcon /></Link>
    <Link className={`nav-link ${selectedPage === "الموردون" ? "selected" : ""}`} href="/suppliers"><GroupAddIcon /></Link>
    <Link className={`nav-link ${selectedPage === "الزبائن" ? "selected" : ""}`} href="/customers"><GroupRemoveIcon /></Link>
    <Link className={`nav-link ${selectedPage === "الإحصائيات" ? "selected" : ""}`} href="/statistics"><AssessmentIcon/></Link>
    <Link className={`nav-link ${selectedPage === "الحساب" ? "selected" : ""}`} href="/account"><AccountBoxIcon /></Link>

    <h1 className='main-title'>{selectedPage}</h1>
    </nav>
  );
}