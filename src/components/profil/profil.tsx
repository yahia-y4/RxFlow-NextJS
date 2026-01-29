"use clirnt"

import MyButton from "../mybutton/myButton"
import "./profil.css"
import{logoutF} from "@/APIs/loguot"
import { AccountContext } from "@/app/account/accountContext"
import { useContext,useState,useEffect } from "react"
import {getUserInfoApi} from "@/APIs/getUserInfoApi"
import { formatDateTime } from "@/APIs/formatDateTime"

export default function Profil(){

      const {isLogin, setIsLogin} = useContext(AccountContext);
      const [userData,setUserData] = useState({
        id:"",
        UserName:"",
        Email:"",
        createdAt:""

      })
    
    async function logoutHandler(){
        await logoutF();
        setIsLogin(false)

    }


    useEffect(()=>{

        async function getUserInfo() {
            const response = await getUserInfoApi()
            if(response.success){
                setUserData(response.userInfo)
            }
        }
        getUserInfo()
    },[])
return(
    <div className="Profil">
         <div className="Profil-div">

<p>اسم المستخدم : {userData.UserName}</p>
<p>البريد الالكتروني : {userData.Email}</p>
<p>تاريخ الانضمام : {formatDateTime(userData.createdAt)}</p>
<div className="Profil-buts">
    <MyButton onClick={logoutHandler}>تسجيل الخروج</MyButton>
</div>

         </div>
    </div>
)
}