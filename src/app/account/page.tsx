"use client"
import { useState,useEffect,useContext } from "react"
import Login from "@/components/logIn/login"
import Profil from "@/components/profil/profil"
import{SelectedPageContext} from "@/app/globalsContext/selectedPageContext"
export default function AccountPage() {  
  const {setSelectedPage}=useContext(SelectedPageContext);
  
  useEffect(()=>{
    setSelectedPage("الحساب");
  },[])


  const [isLogin, setIsLogin] = useState(false)
  if(!isLogin){
    return(<div>
        <Login></Login>
    </div>)
  }
  return(
    <Profil></Profil>
  )


}
