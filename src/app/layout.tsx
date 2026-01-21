import Navbar from "@/components/navbar/navbar";
import ErrorCard from "@/components/errorCard/errorCard";
import "./globals.css";
import { ErrorProvider } from "@/app/globalsContext/errorContext";
import { WarningProvider } from "@/app/globalsContext/warningContext";
import WarningCard from "@/components/warning/warning";



export default function RootLayout({ children,}: Readonly<{children: React.ReactNode;}>)
 
 {

  
  return (
    <html lang="en">
      <body className="layout-body">
        <WarningProvider>
        <ErrorProvider>
        <Navbar/>
        <ErrorCard/>
        <WarningCard/>
        {children}
        </ErrorProvider>
        </WarningProvider>
      </body>
    </html>
  );
}
