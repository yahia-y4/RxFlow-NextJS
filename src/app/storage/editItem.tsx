import "./storage.css";
import MySelect from "@/components/mySelect/mySelect";
import MyInput from "@/components/myInput/myInput";
import MyButton from "@/components/mybutton/myButton";
import { useState,useEffect } from "react";
import { StorageContext } from "./storageContext"
import { useContext } from "react"
import { editItemApi } from "@/APIs/editItemApi";
import { getAllItemsApi } from "@/APIs/getAllItemsApi";
import { ErrorContext } from "../globalsContext/errorContext";
type FormItemData = {
  name?: string;
  company?: string;
  form?: string;
  concent?: number;
  concent_unit?: string;
  titer?: number;
  titer_unit?: string;
  package_type?: string;
  quantity?: number;
  price?: number;
  profit?: number;
  code?: string;
  expiry_date?: string;
};
export default function EditItem() {
     const {setEditItemVisible,setStorageItems,selectedItem,setItemInfoVisible}= useContext(StorageContext);
     const {setErrorCardVisible,setErrorCardMessage}= useContext(ErrorContext);


  useEffect(() => {
    if(selectedItem){
      setFormItemData({
        name: selectedItem.name,
        company: selectedItem.company,
        form: selectedItem.form,
        concent: selectedItem.concent,
        concent_unit: selectedItem.concent_unit,
        titer: selectedItem.titer,
        titer_unit: selectedItem.titer_unit,
        package_type: selectedItem.package_type,
        quantity: selectedItem.quantity,
        price: selectedItem.price,
        profit: selectedItem.profit,
        code: selectedItem.code,
        expiry_date: selectedItem.expiry_date?.substring(0,10),
      })
    }
  },[selectedItem])



   const [formItemData, setFormItemData] = useState<FormItemData>({
      name: "",
      company: "",
      form: "",
      concent: "",
      concent_unit: "الواحدة",
      titer: "",
      titer_unit: "",
      package: "",
      quantity: 1,
      price_buy: 0,
      profit: 0,
      barcode: "",
      expire_date: "",
  
    
    });
    function handleName(e:React.ChangeEvent<HTMLInputElement>) {
      const value = e.target.value;
      setFormItemData({ ...formItemData, name: value });
  
    }
    function handleCompany(e:React.ChangeEvent<HTMLInputElement>) {
      const value = e.target.value;
      setFormItemData({ ...formItemData, company: value });
    }
    function handleForm(e: React.ChangeEvent<HTMLSelectElement>) {
      const value = e.target.value;
      setFormItemData({ ...formItemData, form: value });
  
    }
    function handleConcent(e:React.ChangeEvent<HTMLInputElement>) {
      const value = parseFloat(e.target.value);
      setFormItemData({ ...formItemData, concent: value });
    }
    function handleConcentUnit(e: React.ChangeEvent<HTMLSelectElement>) {
      const value = e.target.value;
      setFormItemData({ ...formItemData, concent_unit: value });
  
    }
    function handleTiter(e:React.ChangeEvent<HTMLInputElement>) {
      const value = parseFloat(e.target.value);
      setFormItemData({ ...formItemData, titer: value });
    }
      function handleTiterUnit(e: React.ChangeEvent<HTMLSelectElement>) {
      const value = e.target.value;
      setFormItemData({ ...formItemData, titer_unit: value });
      }
    function handlePackage(e: React.ChangeEvent<HTMLSelectElement>) {
      const value = e.target.value;
      setFormItemData({ ...formItemData, package_type: value });}  
  
      function handleQuantity(e:React.ChangeEvent<HTMLInputElement>) {
      const value = parseInt(e.target.value);
      setFormItemData({ ...formItemData, quantity: value });
    }
    function handlePriceBuy(e:React.ChangeEvent<HTMLInputElement>) {
      const value = parseFloat(e.target.value);
      setFormItemData({ ...formItemData, price: value });
    }
      function handleProfit(e:React.ChangeEvent<HTMLInputElement>) {
      const value = parseFloat(e.target.value);
      setFormItemData({ ...formItemData, profit: value });
    }
      function handleBarcode(e:React.ChangeEvent<HTMLInputElement>) {
      const value = e.target.value;
      setFormItemData({ ...formItemData, code: value });
    }
      function handleExpireDate(e:React.ChangeEvent<HTMLInputElement>) {
      const value = e.target.value;
      setFormItemData({ ...formItemData, expiry_date: value });
      }
  
  async function handleEdit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
          e.preventDefault();
      const resp = await editItemApi(
        selectedItem.id,
        formItemData.name,
        formItemData.company,
        formItemData.form,
        formItemData.concent,
        formItemData.concent_unit,
        formItemData.titer,
        formItemData.titer_unit,
        formItemData.package_type,
        formItemData.quantity,
        formItemData.price,
        formItemData.profit,
        formItemData.code,
        formItemData.expiry_date,
      );
        if(resp.success){
          setEditItemVisible(false);
          setItemInfoVisible(false);

          
          const items = await getAllItemsApi();
          if(items.success){
            setStorageItems(items.items);
            
           
          }
        }else{
          setErrorCardVisible(true);
          setErrorCardMessage(resp.message);
        }
      } 
  return (
    <div className="edit-item-page">

       <form className="edit-item-form" >
         <MyInput
                    onChange={handleName}
                  input_v={formItemData.name}
                  label_v={"الاسم التجاري"}
                ></MyInput>
        
                <MyInput
                    onChange={handleCompany}
                  input_v={formItemData.company}
                  label_v={"اسم الشركة"}
                ></MyInput>
                <p style={{ fontSize: "18px" }}>الشكل الصيدلاني</p>
                <MySelect onChange={handleForm} value_v={formItemData.form} options_v={["أقراص","كبسول","شراب"]}></MySelect>
        
        
                <MyInput onChange={handleConcent} input_v={formItemData.concent} label_v={"التركيز"}>
                  <MySelect value_v={formItemData.concent_unit} onChange={handleConcentUnit} options_v={["mg", "ml", "g"]}></MySelect>
                </MyInput>
        
        
                <MyInput 
                onChange={handleTiter}
                input_v={formItemData.titer} label_v={"العيار"}>
        
                  <MySelect value_v={formItemData.titer_unit} onChange={handleTiterUnit} options_v={["mg", "ml", "g"]}></MySelect>
                </MyInput>
                <p style={{ fontSize: "18px" }}>نوع العبوة</p>
        
                <MySelect value_v={formItemData.package_type} onChange={handlePackage} options_v={["علبة", "قنينة", "شريط"]}></MySelect>
        
                <MyInput
                  input_v={formItemData.quantity}
                onChange={handleQuantity}
                  label_v={"الكمية"}
                  type_v={"number"}
                ></MyInput>
                <MyInput
                onChange={handlePriceBuy}
                  input_v={formItemData.price}
                  label_v={"سعر الشراء"}
                  type_v={"number"}
                ></MyInput>
                <MyInput
                onChange={handleProfit}
                  input_v={formItemData.profit}
                  label_v={"نسبة الربح %"}
                  type_v={"number"}
                ></MyInput>
                <MyInput
                onChange={handleBarcode}
                  input_v={formItemData.code}
                  label_v={"الباركود"}
                ></MyInput>
                <MyInput
                onChange={handleExpireDate}
                  input_v={formItemData.expiry_date}
                  label_v={"تاريخ الانتهاء"}
                  type_v={"date"}
                ></MyInput>
                <div className="item-form-buts">
                  <MyButton onClick={handleEdit} > تعديل </MyButton>
                  <MyButton onClick={(e)=>{e.preventDefault()
                    setEditItemVisible(false);
                  }}> الغاء</MyButton>
                </div>
       </form>
    </div>
  );
}
 




