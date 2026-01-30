"use client";

import "./suppliers.css";
import MyInput from "@/components/myInput/myInput";
import MyTextarea from "@/components/myTextarea/myTextarea";
import MyButton from "@/components/mybutton/myButton";
import { addSupplierApi } from "@/APIs/addSupplierApi";
import { getSuppliersApi } from "@/APIs/getSuppliersApi";
import { useState, useContext } from "react";
import { ErrorContext } from "../globalsContext/errorContext";
import { SuppliersContext } from "./suppliersContext";

import { LoaderContext } from "@/app/globalsContext/loaderContext";
import { SuccessContext } from "@/app/globalsContext/successContext";

export default function AddNewSuppForm() {
  const [supplierData, setSupplierData] = useState({
    name: "",
    phone_number: "",
    location: "",
    warehouse_name: "",
    payable_amount: 0,
    paid_amount: 0,
  });
  const { setErrorCardMessage, setErrorCardVisible } = useContext(ErrorContext);
  const { setSuppliers, Suppliers } = useContext(SuppliersContext);

  const { setIsLoading } = useContext(LoaderContext);
  const { setIsSuccess, setSuccessMessage } = useContext(SuccessContext);

  // Handle form input changes

  function handleNameChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setSupplierData({ ...supplierData, name: e.target.value });
  }
  function handlePhoneNumberChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setSupplierData({ ...supplierData, phone_number: e.target.value });
  }
  function handleWarehouse_nameChange(
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    setSupplierData({ ...supplierData, warehouse_name: e.target.value });
  }
  function handleLocationChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setSupplierData({ ...supplierData, location: e.target.value });
  }

  //---------------------
  //--- handle submits----
  async function addSupplier(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    setIsLoading(true);
    const response = await addSupplierApi(supplierData);
    if (response.success) {
      console.log(Suppliers);
      const supps = await getSuppliersApi();
      if (supps.success) {
        setSuppliers(supps.suppliers);
        console.log(supps);
        setIsLoading(false);
        setSuccessMessage("تمت إضافة المورد بنجاح");
        setIsSuccess(true);
      }
      cancel(e);
    } else {
      setErrorCardMessage(response.message);
      setErrorCardVisible(true);
      setIsLoading(false);
    }
  }
  function cancel(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    setSupplierData({
      name: "",
      phone_number: "",
      location: "",
      warehouse_name: "",
      payable_amount: 0,
      paid_amount: 0,
    });
  }
  //----------------------
  return (
    <form className="Add-New-Supp-Form">
      <MyInput
        input_v={supplierData.name}
        onChange={handleNameChange}
        label_v={"اسم المورد"}
      ></MyInput>
      <MyInput
        input_v={supplierData.phone_number}
        onChange={handlePhoneNumberChange}
        label_v={"رقم الهاتف"}
      ></MyInput>
      <MyInput
        input_v={supplierData.warehouse_name}
        onChange={handleWarehouse_nameChange}
        label_v={"اسم المسنودع"}
      ></MyInput>
      <MyTextarea
        data_v={supplierData.location}
        onChange={handleLocationChange}
        label_v={"العنوان"}
      ></MyTextarea>
      <div className="Add-New-Supp-Form-buts">
        <MyButton onClick={addSupplier}>إضافة</MyButton>
        <MyButton onClick={cancel}>إلغاء</MyButton>
      </div>
    </form>
  );
}
