"use client"

import { createContext ,useState } from "react";

export const SuppliersContext = createContext(null);

export const SuppliersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

    const [suppliersListVisible,setSuppliersListVisible] = useState(true);
    const [suppliersInfoVisible,setSuppliersInfoVisible] = useState(false);
    const [editSupplierVisible,setEditSupplierVisible] = useState(false);
    const [suppliersPaymentsListVisible,setSuppliersPaymentsListVisible] = useState(false);
    const [supplierInvoicesVisible,setSupplierInvoicesVisible] = useState(false);
    const [selectedSupplier,setSelectedSupplier] = useState(null);
    return (
    <SuppliersContext.Provider
      value ={{suppliersListVisible,
        setSuppliersListVisible,
        suppliersInfoVisible,
        setSuppliersInfoVisible,
        editSupplierVisible,
        setEditSupplierVisible,
        selectedSupplier,
        setSelectedSupplier,
        suppliersPaymentsListVisible,
        setSuppliersPaymentsListVisible,
        supplierInvoicesVisible,
        setSupplierInvoicesVisible,
      }}
    >
      {children}
    </SuppliersContext.Provider>
  );
}
