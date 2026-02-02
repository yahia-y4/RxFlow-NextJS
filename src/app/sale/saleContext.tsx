
"use client";
import { createContext, useState } from 'react';
export const SaleContext = createContext({});

export const SaleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
const [saleGroupVisible, setSaleGroupVisible] = useState(false);
const [saleRecordVisible, setSaleRecordVisible] = useState(false);
const [SalesRecordData,setSalesRecordData] = useState<any[]>([]);
const [itemsInGroup, setItemsInGroup] = useState([ {
          id: 1,
          name: "باراسيتامول",
          company: "ABC Pharma",
          form: "أقراص",
          sale_price: 2.5,
          quantity: 1,
        }]);


  return (
    <SaleContext.Provider value={{saleGroupVisible, setSaleGroupVisible, saleRecordVisible, setSaleRecordVisible, itemsInGroup, setItemsInGroup, SalesRecordData , setSalesRecordData}}>
      {children}
    </SaleContext.Provider>
  );
};