"use client";
import "./storage.css";
import MyButton from "@/components/mybutton/myButton";
import MyInput from "@/components/myInput/myInput";
import MySelect from "@/components/mySelect/mySelect";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AssignmentAddIcon from "@mui/icons-material/AssignmentAdd";
import { StorageContext } from "./storageContext";
import { useContext } from "react";
import { addNewItemApi } from "@/APIs/addNewItemApi";
import { getAllItemsApi } from "@/APIs/getAllItemsApi";
import { ErrorContext } from "@/app/globalsContext/errorContext";
import React, { useState } from "react";

import { LoaderContext } from "@/app/globalsContext/loaderContext";
import { SuccessContext } from "@/app/globalsContext/successContext";

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
  price?: number | string;
  profit?: number | string;
  code?: string;
  expiry_date?: string;
};

const FORM_OPTIONS = [
  { value: "أقراص", label: "أقراص" },
  { value: "كبسولات", label: "كبسولات" },
  { value: "شراب", label: "شراب" },
  { value: "معلق", label: "معلق" },
  { value: "حقن", label: "حقن" },
  { value: "كريم", label: "كريم" },
  { value: "مرهم", label: "مرهم" },
  { value: "قطرات", label: "قطرات" },
  { value: "بخاخ", label: "بخاخ" },
];

const UNIT_OPTIONS = [
  { value: "mg", label: "mg" },
  { value: "g", label: "g" },
  { value: "mcg", label: "mcg" },
  { value: "ml", label: "ml" },
  { value: "iu", label: "iu" },
];

const PACKAGE_OPTIONS = [
  { value: "علبة", label: "علبة" },
  { value: "قنينة", label: "قنينة" },
  { value: "شريط", label: "شريط" },
  { value: "أنبوب", label: "أنبوب" },
  { value: "أمبولة", label: "أمبولة" },
  { value: "كيس", label: "كيس" },
];

export default function StorageRightPart() {
  // states and contexts----------
  const [addItemsVisible, setAddItemsVisible] = useState(false);
  const [formItemData, setFormItemData] = useState<FormItemData>({
    name: "",
    company: "",
    form: "أقراص",
    concent: 0,
    concent_unit: "mg",
    titer: 0,
    titer_unit: "mg",
    package_type: "علبة",
    quantity: 1,
    price: 0,
    profit: 0,
    code: "",
    expiry_date: "",
  });
  const { setErrorCardMessage, setErrorCardVisible } = useContext(ErrorContext);

  const {
    addInvoiceVisible,
    setAddInvoiceVisible,
    setItemInfoVisible,
    setStorageItems,
    storageItems,
  } = useContext(StorageContext);

  const { setIsLoading } = useContext(LoaderContext);
  const { setIsSuccess, setSuccessMessage } = useContext(SuccessContext);

  //----------------------------------------------------------------

  //-------------- input handlers -----------------

  function handleName(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setFormItemData({ ...formItemData, name: value });
  }

  function handleCompany(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setFormItemData({ ...formItemData, company: value });
  }
  function handleForm(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setFormItemData({ ...formItemData, form: value });
  }
  function handleConcent(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setFormItemData({ ...formItemData, concent: parseFloat(value) });
  }
  function handleConcentUnit(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setFormItemData({ ...formItemData, concent_unit: value });
  }
  function handleTiter(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setFormItemData({ ...formItemData, titer: parseFloat(value) });
  }
  function handleTiterUnit(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setFormItemData({ ...formItemData, titer_unit: value });
  }
  function handlePackage(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setFormItemData({ ...formItemData, package_type: value });
  }

  function handleQuantity(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value);
    setFormItemData({ ...formItemData, quantity: value });
  }
  function handlePriceBuy(e: React.ChangeEvent<HTMLInputElement>) {
    setFormItemData({ ...formItemData, price: e.target.value });
  }
  function handleProfit(e: React.ChangeEvent<HTMLInputElement>) {
    setFormItemData({ ...formItemData, profit: e.target.value });
  }
  function handleBarcode(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setFormItemData({ ...formItemData, code: value });
  }
  function handleExpireDate(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setFormItemData({ ...formItemData, expiry_date: value });
  }

  //------------------------------------------------------------

  //-------------- add item to storage function -----------------

  async function addclick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setIsLoading(true);
    const {
      name,
      company,
      form,
      concent,
      concent_unit,
      titer,
      titer_unit,
      package_type,
      quantity,
      price,
      profit,
      code,
      expiry_date,
    } = formItemData;
    const response = await addNewItemApi(
      name,
      company,
      form,
      concent,
      concent_unit,
      titer,
      titer_unit,
      package_type,
      quantity,
      price,
      +profit / 100,
      code,
      expiry_date,
    );
    if (response.success) {
      const newItems = await getAllItemsApi();
      if (newItems.success) {
        setStorageItems(newItems.items);
        emptyHandle(e);
        setIsLoading(false);
        setSuccessMessage("تمت اضافة الدواء بنجاح");
        setIsSuccess(true);
      }
    } else {
      setErrorCardMessage(response.message);
      setErrorCardVisible(true);
      setIsLoading(false);
    }
    console.log(formItemData);
  }

  function emptyHandle(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setFormItemData({
      name: "",
      company: "",
      form: "أقراص",
      concent: 0,
      concent_unit: "mg",
      titer: 0,
      titer_unit: "mg",
      package_type: "علبة",
      quantity: 1,
      price: 0,
      profit: 0,
      code: "",
      expiry_date: "",
    });
  }

  //------------------------------------------------------------

  return (
    <div className="storageRightPart">
      <div className="topButsRightStorage">
        <AddCircleOutlineIcon
          className={addItemsVisible === true ? "active" : ""}
          onClick={() => setAddItemsVisible(!addItemsVisible)}
          style={{ fontSize: "30" }}
        />
        <AssignmentAddIcon
          className={addInvoiceVisible === true ? "active" : ""}
          onClick={() => {
            setAddInvoiceVisible(!addInvoiceVisible);
            setItemInfoVisible(false);
          }}
          style={{ fontSize: "30" }}
        />
      </div>
      {addItemsVisible && (
        <form action="" className="formStorage">
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
          <MySelect
            options_v={FORM_OPTIONS}
            value_v={formItemData.form}
            onChange={handleForm}
          ></MySelect>

          <MyInput
            onChange={handleConcent}
            input_v={formItemData.concent}
            label_v={"التركيز"}
          >
            <MySelect
              options_v={UNIT_OPTIONS}
              value_v={formItemData.concent_unit}
              onChange={handleConcentUnit}
            ></MySelect>
          </MyInput>

          <MyInput
            onChange={handleTiter}
            input_v={formItemData.titer}
            label_v={"العيار"}
          >
            <MySelect
              options_v={UNIT_OPTIONS}
              value_v={formItemData.titer_unit}
              onChange={handleTiterUnit}
            ></MySelect>
          </MyInput>
          <p style={{ fontSize: "18px" }}>نوع العبوة</p>

          <MySelect
            options_v={PACKAGE_OPTIONS}
            value_v={formItemData.package_type}
            onChange={handlePackage}
          ></MySelect>

          <MyInput
            input_v={formItemData.quantity}
            onChange={handleQuantity}
            label_v={"الكمية"}
          ></MyInput>
          <MyInput
            onChange={handlePriceBuy}
            input_v={formItemData.price}
            label_v={"سعر الشراء $ "}
            type_v={"number"}
          ></MyInput>
          <MyInput
            onChange={handleProfit}
            input_v={formItemData.profit}
            label_v={"نسبة الربح % "}
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
            <MyButton onClick={addclick}>اضافة الى المخزن</MyButton>
            <MyButton onClick={emptyHandle}>مسح البيانات</MyButton>
          </div>
        </form>
      )}
    </div>
  );
}
