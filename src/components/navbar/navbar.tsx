"use client"
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import Link from "next/link";
import "./navbar.css";
export default function Navbar() {
  return (
    <nav>
    <Link className='nav-link' href="/"><PersonalVideoIcon /></Link>
    <Link className='nav-link' href="/account"><AccountBoxIcon /></Link>
    <Link className='nav-link' href="/storage"><ArrowCircleDownIcon /></Link>
    <Link className='nav-link' href="/sale"><ArrowCircleUpIcon /></Link>

    <Link className='nav-link' href="/suppliers"><GroupAddIcon /></Link>
    <Link className='nav-link' href="/customers"><GroupRemoveIcon /></Link>
    
    <Link className='nav-link' href="/classes"><AutoAwesomeMosaicIcon /></Link>
    </nav>
  );
}