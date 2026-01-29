 import {AccountProvider} from "./accountContext"

 export default function Layout({
    children,
 }: {
    children: React.ReactNode;
 }) {
    return (
       <AccountProvider>
          {children}
       </AccountProvider>
    );
 }