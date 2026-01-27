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
    const [selectedSupplierID,setSelectedSupplierID] = useState(null);
    const [selectedSupplier,setSelectedSupplier] = useState({});
    const [Suppliers,setSuppliers] = useState([]);
    return (
    <SuppliersContext.Provider
      value ={{suppliersListVisible,
        setSuppliersListVisible,
        suppliersInfoVisible,
        setSuppliersInfoVisible,
        editSupplierVisible,
        setEditSupplierVisible,
        suppliersPaymentsListVisible,
        setSuppliersPaymentsListVisible,
        supplierInvoicesVisible,
        setSupplierInvoicesVisible,
        Suppliers,
        setSuppliers,
        selectedSupplierID,
        setSelectedSupplierID,
        selectedSupplier,
        setSelectedSupplier

        
      }}
    >
      {children}
    </SuppliersContext.Provider>
  );
}
