"use client";

import "./storage.css";
import { useState, useEffect, useContext } from "react";

import MySelect from "@/components/mySelect/mySelect";
import MyInput from "@/components/myInput/myInput";
import MyButton from "@/components/mybutton/myButton";

import { StorageContext } from "./storageContext";
import { ErrorContext } from "../globalsContext/errorContext";

import { editItemApi } from "@/APIs/editItemApi";
import { getAllItemsApi } from "@/APIs/getAllItemsApi";
import { getOneItemApi } from "@/APIs/getOneItemApi";

import { LoaderContext } from "@/app/globalsContext/loaderContext";
import { SuccessContext } from "@/app/globalsContext/successContext";

/* ================= TYPES ================= */

type FormItemData = {
  name: string;
  company: string;
  form: string;
  concent: number;
  concent_unit: string;
  titer: number;
  titer_unit: string;
  package_type: string;
  quantity: number;
  price: number;
  profit: number;
  code: string;
  expiry_date: string;
};

/* ================ OPTIONS ================= */

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

export default function EditItem() {
  const { setIsLoading } = useContext(LoaderContext);
  const { setIsSuccess, setSuccessMessage } = useContext(SuccessContext);

  const { setEditItemVisible, setStorageItems, selectedItem, setSelectedItem } = useContext(StorageContext);
   

  const { setErrorCardVisible, setErrorCardMessage } = useContext(ErrorContext);

  /* ================ STATE ================= */

  const [formItemData, setFormItemData] = useState<FormItemData>({
    name: "",
    company: "",
    form: "",
    concent: 0,
    concent_unit: "mg",
    titer: 0,
    titer_unit: "mg",
    package_type: "",
    quantity: 1,
    price: 0,
    profit: 0,
    code: "",
    expiry_date: "",
  });

  /* ================ EFFECT ================= */

  useEffect(() => {
    if (!selectedItem) return;

    setFormItemData({
      name: selectedItem.name ?? "",
      company: selectedItem.company ?? "",
      form: selectedItem.form ?? "",
      concent: selectedItem.concent ?? 0,
      concent_unit: selectedItem.concent_unit ?? "mg",
      titer: selectedItem.titer ?? 0,
      titer_unit: selectedItem.titer_unit ?? "mg",
      package_type: selectedItem.package_type ?? "",
      quantity: selectedItem.quantity ?? 1,
      price: selectedItem.price ?? 0,
      profit: selectedItem.profit ?? 0,
      code: selectedItem.code ?? "",
      expiry_date: selectedItem.expiry_date?.substring(0, 10) ?? "",
    });
  }, [selectedItem]);

  /* ================ HANDLERS ================= */

  const update =(key: keyof FormItemData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setFormItemData((prev) => ({
        ...prev,
        [key]:
          e.target.type === "number" ? Number(e.target.value) : e.target.value,
      }));

  async function handleEdit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsLoading(true);
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

    if (resp.success) {
      setEditItemVisible(false);
      const items = await getAllItemsApi();
      const oneItem = await getOneItemApi(selectedItem.id);
      if (items.success && oneItem.success) {
        setStorageItems(items.items);
        setSelectedItem(oneItem.data);
        setIsLoading(false);
        setSuccessMessage("تم تعديل الدواء بنجاح");
        setIsSuccess(true);
      }
    } else {
      setErrorCardVisible(true);
      setErrorCardMessage(resp.message);
      setIsLoading(false);
    }
  }

  return (
    <div className="edit-item-page">
      <form className="edit-item-form">
        <MyInput
          label_v="الاسم التجاري"
          input_v={formItemData.name}
          onChange={update("name")}
        />

        <MyInput
          label_v="اسم الشركة"
          input_v={formItemData.company}
          onChange={update("company")}
        />

        <p>الشكل الصيدلاني</p>
        <MySelect
          value_v={formItemData.form}
          onChange={update("form")}
          options_v={FORM_OPTIONS}
          placeholder="اختر الشكل"
        />

        <MyInput
          label_v="التركيز"
          input_v={formItemData.concent}
          onChange={update("concent")}
        >
          <MySelect
            value_v={formItemData.concent_unit}
            onChange={update("concent_unit")}
            options_v={UNIT_OPTIONS}
          />
        </MyInput>

        <MyInput
          label_v="العيار"
          input_v={formItemData.titer}
          onChange={update("titer")}
        >
          <MySelect
            value_v={formItemData.titer_unit}
            onChange={update("titer_unit")}
            options_v={UNIT_OPTIONS}
          />
        </MyInput>

        <p>نوع العبوة</p>
        <MySelect
          value_v={formItemData.package_type}
          onChange={update("package_type")}
          options_v={PACKAGE_OPTIONS}
          placeholder="اختر نوع العبوة"
        />

        <MyInput
          label_v="الكمية"
          type_v="number"
          input_v={formItemData.quantity}
          onChange={update("quantity")}
        />

        <MyInput
          label_v="سعر الشراء"
          type_v="number"
          input_v={formItemData.price}
          onChange={update("price")}
        />

        <MyInput
          label_v="نسبة الربح %"
          type_v="number"
          input_v={formItemData.profit}
          onChange={update("profit")}
        />

        <MyInput
          label_v="الباركود"
          input_v={formItemData.code}
          onChange={update("code")}
        />

        <MyInput
          label_v="تاريخ الانتهاء"
          type_v="date"
          input_v={formItemData.expiry_date}
          onChange={update("expiry_date")}
        />

        <div className="item-form-buts">
          <MyButton onClick={handleEdit}>تعديل</MyButton>
          <MyButton
            onClick={(e) => {
              e.preventDefault();
              setEditItemVisible(false);
            }}
          >
            الغاء
          </MyButton>
        </div>
      </form>
    </div>
  );
}
