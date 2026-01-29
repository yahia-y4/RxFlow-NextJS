import Navbar from "@/components/navbar/navbar";
import ErrorCard from "@/components/errorCard/errorCard";
import "./globals.css";
import { ErrorProvider } from "@/app/globalsContext/errorContext";
import { WarningProvider } from "@/app/globalsContext/warningContext";
import{SelectedPageProvider} from "@/app/globalsContext/selectedPageContext"
import {SuccessProvider} from "@/app/globalsContext/successContext"
import WarningCard from "@/components/warning/warning";
import SuccessCard from "@/components/successCard/successCard";




export default function RootLayout({ children,}: Readonly<{children: React.ReactNode;}>)
 
 {

  
  return (
    <html lang="en">
      <body className="layout-body">
        <SuccessProvider>
        <SelectedPageProvider>
        <WarningProvider>
        <ErrorProvider>
        <SuccessCard/>
        <Navbar/>
        <ErrorCard/>
        <WarningCard/>
        {children}
        </ErrorProvider>
        </WarningProvider>
        </SelectedPageProvider>
        </SuccessProvider>
      </body>
    </html>
  );
}
