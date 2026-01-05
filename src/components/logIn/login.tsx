"use client"
import { useState } from "react"
import "./login.css"
import MyInput from "../myInput/myInput"

type UserData = {
  userName?: string
  email?: string
  password?: string
}
type SignupOrLogin = "login" | "signup"


export default function Login() {
  const [mode,setMode] = useState<SignupOrLogin>("signup")
  const [userData, setUserData] = useState<UserData>({
    userName: "",
    email: "",
    password: ""
  }) 


  return (
    <div className="login-container">
        <form className="login-form">
            {mode === "signup"? (<MyInput label_v={"اسم المستخدم"}></MyInput>) : (<></>) }
            <MyInput label_v={"البريد الالكتروني"}></MyInput>
            <MyInput label_v={"كلمة المرور"}></MyInput>
      </form>
    
    </div>
   
  )
}
