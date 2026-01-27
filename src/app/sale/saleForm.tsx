"use client";

import "./sale.css";
import MyInput from "@/components/myInput/myInput";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EventNoteIcon from "@mui/icons-material/EventNote";
import MySelect from "@/components/mySelect/mySelect";
import MyButton from "@/components/mybutton/myButton";
import { useState,useEffect } from "react";
import { useContext } from "react";
import { SaleContext } from "./saleContext";
import { getAllItemsApi } from "@/APIs/getAllItemsApi";
import {ErrorContext} from "../globalsContext/errorContext";
import{sellOneItemApi} from "@/APIs/sellOneItemApi"
export default function SaleForm() {
  const {setErrorCardMessage,setErrorCardVisible} = useContext(ErrorContext);
  const {setItemsInGroup} = useContext(SaleContext);  
  const{setSaleRecordVisible,setSaleGroupVisible,saleGroupVisible,saleRecordVisible} = useContext(SaleContext);
  const[saleDataForm,setSaleDataForm]= useState({
         id:0,
        barcode:"",
        name:"",
        company:"",
        form:"",
        quantity:1,
        price:0,
    });


    const [items, setItems] = useState([]);

   useEffect(() => {
    async function fetchItems() {
        const res = await getAllItemsApi();
        if (res.success) {
            setItems(res.items);
        } else {
            console.log("Failed to fetch items");
        }
    }
    fetchItems();
}, []);

  function findItemByBarcode(code: string) {
    return items.find((item: { code: string }) => item.code === code);
  }
    // handle inputs
    function handleBarcode(e:React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
      const foundItem = findItemByBarcode(value);
      console.log("found item ",foundItem);
      
    setSaleDataForm({ ...saleDataForm, barcode: value });
    if (foundItem) {
      setSaleDataForm({
        ...saleDataForm,
        id: foundItem.id,
        barcode: value,
        name: foundItem.name,
        company: foundItem.company,
        form: foundItem.form,
        price: foundItem.sell_price,
      })
 

    }
    else{
      setSaleDataForm({ ...saleDataForm, barcode: value });
      setSaleDataForm({
        ...saleDataForm,
        barcode: value,
        id:0,
        name:"",
        company:"",
        form:"",
        quantity:1,
        price:0,
    })
    }
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
    async function handleSale(e:React.MouseEvent<HTMLButtonElement, MouseEvent>){
    e.preventDefault();
   
    const dataObjct = {
      items:[{
        id:saleDataForm.id,
        quantity:saleDataForm.quantity,
        salePrice:saleDataForm.price,
      }]
    }
    const response = await sellOneItemApi(dataObjct)
    if(response.success){
      console.log("item sold successfully");
      const responseItems = await getAllItemsApi();
      if(responseItems.success){
        setItemsInGroup(responseItems.items);
      }else{
        setErrorCardMessage(responseItems.message)
        setErrorCardVisible(true)
      }
      setSaleDataForm({
        id:0,
        barcode:"",
        name:"",
        company:"",
        form:"",
        quantity:1,
        price:0,
    }) 
}
else{
  setErrorCardMessage(response.message)
  setErrorCardVisible(true)
}

}

    //==نقر البيع==


    // نقر محو
function emptyHandle(e:React.MouseEvent<HTMLButtonElement, MouseEvent>){
    e.preventDefault();
    setSaleDataForm({
        id:0,
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
        {/* <ShoppingCartIcon onClick={()=>{setSaleGroupVisible(!saleGroupVisible)}}
          style={{ fontSize: "30px", cursor: "pointer" }}
        ></ShoppingCartIcon> */}
        <EventNoteIcon onClick={()=>{setSaleRecordVisible(!saleRecordVisible)}}
          style={{ fontSize: "30px", cursor: "pointer" }}
        ></EventNoteIcon>
      </div>

      <form className="sale-form">
        <MyInput onChange={handleBarcode} input_v={saleDataForm.barcode} label_v={"الباركود"} />
        <MyInput  input_v={saleDataForm.name} label_v={"اسم الدواء"} />
        <MyInput  input_v={saleDataForm.company} label_v={"الشركة"} />
        
        <MyInput  input_v={saleDataForm.form}  label_v={"الشكل"} />
        <MyInput onChange={handleQuantity}  input_v={saleDataForm.quantity} label_v={"الكمية"} type_v={"number"} />
        <MyInput  input_v={saleDataForm.price} label_v={"السعر"} type_v={"number"} />

        <h3> السعر الاجمالي : {saleDataForm.quantity * saleDataForm.price}</h3>
        <div className="sale-form-buts">
            <MyButton onClick={handleSale}>{saleGroupVisible === false ? "بيع":"اضافة"}</MyButton>
            <MyButton onClick={emptyHandle}>محو</MyButton>
           
        </div>

      </form>
    </div>
  );
}
