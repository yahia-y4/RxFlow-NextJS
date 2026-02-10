"use client";
import { useState } from "react";
import "./login.css";
import MyInput from "../myInput/myInput";
import MyButton from "../mybutton/myButton"
import { CreateNewUser } from "@/APIs/registerApis";
import { loginApi } from "@/APIs/loginApi";
import { useContext } from "react";
import { ErrorContext } from "@/app/globalsContext/errorContext";
import { AccountContext } from "@/app/account/accountContext";
import { LoaderContext } from "@/app/globalsContext/loaderContext";
import { SuccessContext } from "@/app/globalsContext/successContext";

type UserData = {
  UserName?: string;
  Email?: string;
  Password?: string;
};
type SignupOrLogin = "login" | "signup";

export default function Login() {
  const { setIsLoading } = useContext(LoaderContext);
  const { setIsSuccess, setSuccessMessage } = useContext(SuccessContext);

  const [mode, setMode] = useState<SignupOrLogin>("signup");
  const [userData, setUserData] = useState<UserData>({
    UserName: "",
    Email: "",
    Password: "",
  });
  const { isLogin, setIsLogin } = useContext(AccountContext);

  const { setErrorCardMessage, setErrorCardVisible } = useContext(ErrorContext);
  async function loginHandler(e: React.FormEvent) {
    e.preventDefault();
    console.log(mode);
    if (mode === "signup") {
      //signup logic
      const response = await CreateNewUser(
        userData.UserName!,
        userData.Email!,
        userData.Password!,
      );
      const response2 = await loginApi(userData.Email!, userData.Password!);
      setIsLoading(true);

      if (response.success && response2.success) {
        console.log(response);
        setMode("login");
        setIsLogin(true);
        setIsLoading(false);
        setSuccessMessage("تم انشاء الحساب بنجاح");
        setIsSuccess(true);
      } else {
        console.log(response);
        setErrorCardMessage(response.message);
        setErrorCardVisible(true);
        setIsLoading(false);
      }
    } else {
      //login logic
      const response = await loginApi(userData.Email!, userData.Password!);
      setIsLoading(true);
      if (response.success) {
        console.log(response);
        setIsLogin(true);
        setIsLoading(false);
        setSuccessMessage("تم تسجيل الدخول بنجاح");
        setIsSuccess(true);
      } else {
        console.log(response);
        setErrorCardMessage(response.message);
        setErrorCardVisible(true);
        setIsLoading(false);
      }
    }
  }
  function ChangeMode(e: React.FormEvent) {
    e.preventDefault();
    if (mode === "signup") {
      setMode("login");
    } else {
      setMode("signup");
    }
  }

  function handleUserNameInput(e: React.ChangeEvent<HTMLInputElement>) {
    setUserData({ ...userData, UserName: e.target.value });
  }
  function handleEmailInput(e: React.ChangeEvent<HTMLInputElement>) {
    setUserData({ ...userData, Email: e.target.value });
  }
  function handlePasswordInput(e: React.ChangeEvent<HTMLInputElement>) {
    setUserData({ ...userData, Password: e.target.value });
  }

  return (
    <div className="login-container">
      <form className="login-form">
        {mode === "signup" ? (
          <MyInput
            input_v={userData.UserName}
            label_v={"اسم المستخدم"}
            onChange={handleUserNameInput}
          ></MyInput>
        ) : (
          <></>
        )}
        <MyInput
          input_v={userData.Email}
          label_v={"البريد الالكتروني"}
          type_v="email"
          onChange={handleEmailInput}
        ></MyInput>
        <MyInput
          input_v={userData.Password}
          label_v={"كلمة المرور"}
          type_v="password"
          onChange={handlePasswordInput}
        ></MyInput>
        <div className="loginButs-div">
          <MyButton onClick={loginHandler}>
            {mode === "signup" ? "انشاء حساب" : "تسجيل الدخول"}
          </MyButton>
          <MyButton onClick={ChangeMode}>
            {mode === "signup"
              ? "لديك حساب؟ سجل الدخول"
              : "ليس لديك حساب؟ انشئ حساب"}
          </MyButton>
        </div>
      </form>
    </div>
  );
}
