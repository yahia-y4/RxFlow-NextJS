"use client"
import { useState } from "react"
import "./login.css"
import MyInput from "../myInput/myInput"
import MyButton from "../mybutton/myButton"

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
  function loginHandler(e:React.FormEvent){
    e.preventDefault()
    if(mode === "signup"){
        //signup logic
    }else{
        //login logic
    }
  }
  function ChangeMode(e:React.FormEvent){
    e.preventDefault()
    if(mode === "signup"){
        setMode("login")
    }else{
        setMode("signup")
    }
  }


  return (
    <div className="login-container">
      
        <form className="login-form">
            {mode === "signup"? (<MyInput label_v={"اسم المستخدم"}></MyInput>) : (<></>) }
            <MyInput label_v={"البريد الالكتروني"}></MyInput>
            <MyInput label_v={"كلمة المرور"}></MyInput>
            <div className="loginButs-div">
                <MyButton onClick={loginHandler}>{mode === "signup"? "انشاء حساب" : "تسجيل الدخول"}</MyButton>
                <MyButton onClick={ChangeMode}>{mode === "signup"? "لديك حساب؟ سجل الدخول" : "ليس لديك حساب؟ انشئ حساب"}</MyButton>
            </div>
      </form>
    
    </div>
   
  )
}
