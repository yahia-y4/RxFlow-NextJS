"use client"
import {useEffect,useContext } from "react"
import Login from "@/components/logIn/login"
import Profil from "@/components/profil/profil"
import{SelectedPageContext} from "@/app/globalsContext/selectedPageContext"
import { AccountContext } from "./accountContext"
import { checkLogIn } from "@/APIs/checkLogIn"
export default function AccountPage() {  
  const {isLogin, setIsLogin} = useContext(AccountContext);
  const {setSelectedPage}=useContext(SelectedPageContext);
  
  useEffect(()=>{
    setSelectedPage("الحساب");
    async function checkLogInF() {
      const response = await checkLogIn()
      setIsLogin(response)
    }
    checkLogInF()

  },[])


  if(!isLogin){
    return(<div>
        <Login></Login>
    </div>)
  }
  return(
    <Profil></Profil>
  )


}
