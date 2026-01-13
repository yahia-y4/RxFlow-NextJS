"use client";

import { createContext, useState } from "react";
export const StorageContext = createContext(null);

export const StorageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [editItemVisible, setEditItemVisible] = useState(false);
  const [itemInfoVisible, setItemInfoVisible] = useState(true);
  const [addInvoiceVisible, setAddInvoiceVisible] = useState(false);
  const [storageItems, setStorageItems] = useState([]);

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
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};
