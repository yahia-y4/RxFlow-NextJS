"use client";

import "./sale.css";
import { useState, useEffect, useContext } from "react";

import MyInput from "@/components/myInput/myInput";
import MyButton from "@/components/mybutton/myButton";
import EventNoteIcon from "@mui/icons-material/EventNote";

import { SaleContext } from "./saleContext";
import { ErrorContext } from "../globalsContext/errorContext";

import { getAllItemsApi } from "@/APIs/getAllItemsApi";
import { sellOneItemApi } from "@/APIs/sellOneItemApi";


import {LoaderContext} from "@/app/globalsContext/loaderContext"
import {SuccessContext} from "@/app/globalsContext/successContext"

/* ================= TYPES ================= */

type Item = {
  id: number;
  code: string;
  name: string;
  company: string;
  form: string;
  sell_price: number;
};

type SaleFormData = {
  id: number;
  barcode: string;
  name: string;
  company: string;
  form: string;
  quantity: number;
  price: number;
};

/* ================ COMPONENT ================ */

export default function SaleForm() {
  const { setErrorCardMessage, setErrorCardVisible } =
    useContext(ErrorContext);

  const {
    setItemsInGroup,
    setSaleRecordVisible,
    saleRecordVisible,
    saleGroupVisible,
  } = useContext(SaleContext);

  /* ================ STATE ================= */

  const [saleDataForm, setSaleDataForm] = useState<SaleFormData>({
    id: 0,
    barcode: "",
    name: "",
    company: "",
    form: "",
    quantity: 1,
    price: 0,
  });

  const [items, setItems] = useState<Item[]>([]);

  
    const {setIsLoading} =  useContext(LoaderContext);
    const {setIsSuccess , setSuccessMessage} = useContext(SuccessContext);

  /* ================ EFFECT ================= */

  useEffect(() => {
    setIsLoading(true);
    async function fetchItems() {
      const res = await getAllItemsApi();
      if (res.success) {
        setItems(res.items);
        setIsLoading(false);
      } else {
        console.error("Failed to fetch items");
        setIsLoading(false);
      }
    }
    fetchItems();
  }, []);

  /* ================ HELPERS ================= */

  function findItemByBarcode(code: string): Item | undefined {
    return items.find(item => item.code === code);
  }

  /* ================ HANDLERS ================= */

  function handleBarcode(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const foundItem = findItemByBarcode(value);

    if (foundItem) {
      setSaleDataForm(prev => ({
        ...prev,
        id: foundItem.id,
        barcode: value,
        name: foundItem.name,
        company: foundItem.company,
        form: foundItem.form,
        price: foundItem.sell_price,
      }));
    } else {
      setSaleDataForm(prev => ({
        ...prev,
        barcode: value,
        id: 0,
        name: "",
        company: "",
        form: "",
        quantity: 1,
        price: 0,
      }));
    }
  }

  function handleName(e: React.ChangeEvent<HTMLInputElement>) {
    setSaleDataForm(prev => ({ ...prev, name: e.target.value }));
  }

  function handleCompany(e: React.ChangeEvent<HTMLInputElement>) {
    setSaleDataForm(prev => ({ ...prev, company: e.target.value }));
  }

  function handleForm(e: React.ChangeEvent<HTMLInputElement>) {
    setSaleDataForm(prev => ({ ...prev, form: e.target.value }));
  }

  function handleQuantity(e: React.ChangeEvent<HTMLInputElement>) {
    setSaleDataForm(prev => ({
      ...prev,
      quantity: Number(e.target.value) || 1,
    }));
  }

  function handlePrice(e: React.ChangeEvent<HTMLInputElement>) {
    setSaleDataForm(prev => ({
      ...prev,
      price: Number(e.target.value) || 0,
    }));
  }

  async function handleSale(e: React.MouseEvent<HTMLButtonElement>) {
setIsLoading(true);
    e.preventDefault();

    const dataObject = {
      items: [
        {
          id: saleDataForm.id,
          quantity: saleDataForm.quantity,
          salePrice: saleDataForm.price,
        },
      ],
    };

  
    const response = await sellOneItemApi(dataObject);

    if (response.success) {
      const responseItems = await getAllItemsApi();
      if (responseItems.success) {
        setItemsInGroup(responseItems.items);
        setIsLoading(false);
        setIsSuccess(true);
        setSuccessMessage("تم البيع بنجاح");
      } else {
        setErrorCardMessage(responseItems.message);
        setErrorCardVisible(true);
        setIsLoading(false);
      }

      setSaleDataForm({
        id: 0,
        barcode: "",
        name: "",
        company: "",
        form: "",
        quantity: 1,
        price: 0,
      });
    } else {
      setErrorCardMessage(response.message);
      setErrorCardVisible(true);
    }
  }

  function emptyHandle(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();
    setSaleDataForm({
      id: 0,
      barcode: "",
      name: "",
      company: "",
      form: "",
      quantity: 1,
      price: 0,
    });
  }

  /* ================ RENDER ================= */

  return (
    <div className="sale-form-container">
      <div className="sale-top-buts">
        <EventNoteIcon
          onClick={() =>
            setSaleRecordVisible(!saleRecordVisible)
          }
          style={{ fontSize: "30px", cursor: "pointer" }}
        />
      </div>

      <form className="sale-form">
        <MyInput
          label_v="الباركود"
          input_v={saleDataForm.barcode}
          onChange={handleBarcode}
        />

        <MyInput
          label_v="اسم الدواء"
          input_v={saleDataForm.name}
          onChange={handleName}
        />

        <MyInput
          label_v="الشركة"
          input_v={saleDataForm.company}
          onChange={handleCompany}
        />

        <MyInput
          label_v="الشكل"
          input_v={saleDataForm.form}
          onChange={handleForm}
        />

        <MyInput
          label_v="الكمية"
          type_v="number"
          input_v={saleDataForm.quantity}
          onChange={handleQuantity}
        />

        <MyInput
          label_v="السعر"
          type_v="number"
          input_v={saleDataForm.price}
          onChange={handlePrice}
        />

        <h3>
          السعر الاجمالي :
          {saleDataForm.quantity * saleDataForm.price}
        </h3>

        <div className="sale-form-buts">
          <MyButton onClick={handleSale}>
            {saleGroupVisible ? "اضافة" : "بيع"}
          </MyButton>
          <MyButton onClick={emptyHandle}>محو</MyButton>
        </div>
      </form>
    </div>
  );
}
