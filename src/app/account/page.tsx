"use client"
import { useState } from "react"
import Login from "@/components/logIn/login"
import Profil from "@/components/profil/profil"
export default function AccountPage() {  
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
