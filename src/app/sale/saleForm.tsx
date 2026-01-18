"use client";

import "./sale.css";
import MyInput from "@/components/myInput/myInput";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EventNoteIcon from "@mui/icons-material/EventNote";
import MySelect from "@/components/mySelect/mySelect";
import MyButton from "@/components/mybutton/myButton";
import { useState } from "react";
import { useContext } from "react";
import { SaleContext } from "./saleContext";
export default function SaleForm() {
  const {setItemsInGroup} = useContext(SaleContext);  
  const{setSaleRecordVisible,setSaleGroupVisible,saleGroupVisible,saleRecordVisible} = useContext(SaleContext);
    const[saleDataForm,setSaleDataForm]= useState({
        barcode:"",
        name:"",
        company:"",
        form:"",
        quantity:1,
        price:0,
    });

    // handle inputs
    function handleBarcode(e:React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSaleDataForm({ ...saleDataForm, barcode: value });
    }
    function handleName(e:React.ChangeEvent<HTMLInputElement>) {
      const value = e.target.value;
      setSaleDataForm({ ...saleDataForm, name: value });
    }
    function handleCompany(e:React.ChangeEvent<HTMLInputElement>) {
      const value = e.target.value;
      setSaleDataForm({ ...saleDataForm, company: value });
    }
    function handleForm(e: React.ChangeEvent<HTMLSelectElement>) {
      const value = e.target.value;
      setSaleDataForm({ ...saleDataForm, form: value });
    }
    function handleQuantity(e:React.ChangeEvent<HTMLInputElement>) {
      const value = parseInt(e.target.value);
      setSaleDataForm({ ...saleDataForm, quantity: value });
    }
    function handlePrice(e:React.ChangeEvent<HTMLInputElement>) {
      const value = parseFloat(e.target.value);
      setSaleDataForm({ ...saleDataForm, price: value });
    }

    // ==handle inputs==


    //نقر البيع
function handleSale(e){
    e.preventDefault();
    console.log("selling item ",saleDataForm);
}
    //==نقر البيع==


    // نقر محو
function emptyHandle(e){
    e.preventDefault();
    setSaleDataForm({
        barcode:"",
        name:"",
        company:"",
        form:"",
        quantity:1,
        price:0,
    });}
    // ==نقر محو==

  return (
    <div className="sale-form-container">
      <div className="sale-top-buts">
        <ShoppingCartIcon onClick={()=>{setSaleGroupVisible(!saleGroupVisible)}}
          style={{ fontSize: "30px", cursor: "pointer" }}
        ></ShoppingCartIcon>
        <EventNoteIcon onClick={()=>{setSaleRecordVisible(!saleRecordVisible)}}
          style={{ fontSize: "30px", cursor: "pointer" }}
        ></EventNoteIcon>
      </div>

      <form className="sale-form">
        <MyInput onChange={handleBarcode} input_v={saleDataForm.barcode} label_v={"الباركود"} />
        <MyInput onChange={handleName} input_v={saleDataForm.name} label_v={"اسم الدواء"} />
        <MyInput onChange={handleCompany} input_v={saleDataForm.company} label_v={"الشركة"} />
        <p>الشكل</p>
        <MySelect onChange={handleForm} value_v={saleDataForm.form} options_v={["أقراص", "كبسول", "شراب"]}/>
        <MyInput onChange={handleQuantity} input_v={saleDataForm.quantity} label_v={"الكمية"} type_v={"number"} />
        <MyInput onChange={handlePrice} input_v={saleDataForm.price} label_v={"السعر"} type_v={"number"} />

        <h3> السعر الاجمالي : {saleDataForm.quantity * saleDataForm.price}</h3>
        <div className="sale-form-buts">
            <MyButton onClick={handleSale}>{saleGroupVisible === false ? "بيع":"اضافة"}</MyButton>
            <MyButton onClick={emptyHandle}>محو</MyButton>
           
        </div>

      </form>
    </div>
  );
}
