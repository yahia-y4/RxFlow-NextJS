
import { SuppliersProvider } from "./suppliersContext";
export default function SuppliersLayout({children}:{children:React.ReactNode}){
    return (
        <div>
            <SuppliersProvider>
                {children}
            </SuppliersProvider>
        </div>
    )
}