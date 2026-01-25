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
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};
