"use client";

import { createContext, useState } from "react";
export const StorageContext = createContext(null);

export const StorageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [editItemVisible, setEditItemVisible] = useState(false);
  const [itemInfoVisible, setItemInfoVisible] = useState(false);
  const [addInvoiceVisible, setAddInvoiceVisible] = useState(false);
  const [storageItems, setStorageItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [InvoiceData, setInvoiceData] = useState({
    warehouseId: "",
    paid_amount:"",
    note:"y",
    items: []
  });
const [tempItemsInvoice,setTempItemsInvoice] = useState([]);
  return (
    <StorageContext.Provider
      value={{
        editItemVisible,
        setEditItemVisible,
        storageItems,
        setStorageItems,
        itemInfoVisible,
        setItemInfoVisible,
        addInvoiceVisible,
        setAddInvoiceVisible,
        selectedItem,
        setSelectedItem,
        InvoiceData,
        setInvoiceData,
        tempItemsInvoice,
        setTempItemsInvoice,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};
