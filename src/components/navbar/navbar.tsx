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
    <Link className='nav-link' href="/"><PersonalVideoIcon /></Link>
    <Link className='nav-link' href="/storage"><ArrowCircleDownIcon /></Link>
    <Link className='nav-link' href="/sale"><ArrowCircleUpIcon /></Link>
    <Link className='nav-link' href="/purchaseInvoice"><ReceiptLongIcon /></Link>
    <Link className='nav-link' href="/suppliers"><GroupAddIcon /></Link>
    <Link className='nav-link' href="/customers"><GroupRemoveIcon /></Link>
    <Link className='nav-link' href="/statistics"><AssessmentIcon/></Link>
        <Link className='nav-link' href="/account"><AccountBoxIcon /></Link>

    <h1 className='main-title'>{selectedPage}</h1>
    </nav>
  );
}