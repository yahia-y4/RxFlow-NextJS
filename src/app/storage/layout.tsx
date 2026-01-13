import {StorageProvider} from "./storageContext"
import { StorageContext } from "./storageContext"
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <StorageProvider>
    {children}
    </StorageProvider>
  );
}