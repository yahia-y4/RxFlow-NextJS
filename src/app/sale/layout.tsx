import { SaleProvider } from './saleContext';
export default function SaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     <SaleProvider> 
     {children}
     </SaleProvider>
    
    
  );
}