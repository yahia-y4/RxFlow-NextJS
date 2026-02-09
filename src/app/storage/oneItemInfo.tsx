import "./storage.css"
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';
import { StorageContext } from "./storageContext"
import { WarningContext } from "@/app/globalsContext/warningContext"
import {deleteItemApi} from "@/APIs/deleteItemApi"
import {getAllItemsApi} from "@/APIs/getAllItemsApi"
import { useContext } from "react"
import { formatDateTime } from "@/APIs/formatDateTime";

import {LoaderContext} from "@/app/globalsContext/loaderContext"
import {SuccessContext} from "@/app/globalsContext/successContext"
import { truncateToTwoDecimals } from "@/APIs/truncateToTwoDecimals";
import { ErrorContext } from "../globalsContext/errorContext"; 
export default function OneItemInfo() {

    const {setIsLoading} =  useContext(LoaderContext);
    const {setErrorCardVisible,setErrorCardMessage} = useContext(ErrorContext)
    const {setIsSuccess , setSuccessMessage} = useContext(SuccessContext);
    const {setEditItemVisible,setItemInfoVisible,selectedItem,setStorageItems} = useContext(StorageContext);
    const {setWarningFunction,setWarningCardMessage,setWarningCardVisible} = useContext(WarningContext);



    async function deleteItem(id:number) {
        setIsLoading(true);

        const res = await deleteItemApi(id);
        if(res.success){
            setItemInfoVisible(false);
            const res = await getAllItemsApi();
            if(res.success){
                setStorageItems(res.items);
                setIsLoading(false);
                setIsSuccess(true);
                setSuccessMessage("تم حذف العنصر بنجاح");
            }else{
                setErrorCardVisible(true)
                setErrorCardMessage(res.message)
                setIsLoading(false)


            }

        }
      
    }

    function delClicke(){
     setWarningFunction(() => () => deleteItem(selectedItem.id));
     setWarningCardMessage("هل أنت متأكد من حذف هذا العنصر؟");
     setWarningCardVisible(true);
    }
   
  return (
    <div className="one-item-info-page">
        <div className="one-item-info-top-buts">
            <EditSquareIcon onClick={() => setEditItemVisible(true)} style={{fontSize:"30px",cursor:"pointer"}}></EditSquareIcon>
            <DeleteForeverIcon onClick={delClicke} style={{fontSize:"30px",cursor:"pointer"}}></DeleteForeverIcon>
            <CloseIcon style={{fontSize:"30px",cursor:"pointer"}} onClick={() => setItemInfoVisible(false)}></CloseIcon>

        </div>
         <div className="one-item-info-container">
          <p className="one-item-info">الرقم : {selectedItem.id}</p>
            <p className="one-item-info">اسم الدواء : {selectedItem.name}</p>
            <p className="one-item-info">الشركة : {selectedItem.company}</p>
            <p className="one-item-info">الشكل : {selectedItem.form}</p>
            <p className="one-item-info">الكمية المتوفرة : {selectedItem.quantity}</p>
            <p  className="one-item-info">التركيز :{selectedItem.concent} {selectedItem.concent_unit}</p>
            <p className="one-item-info">العيار : {selectedItem.titer} {selectedItem.titer_unit}</p>
            <p className="one-item-info">العبوة : {selectedItem.package_type}</p>
            <p className="one-item-info">سعر الشراء : {truncateToTwoDecimals(selectedItem.price)} $ </p>
            <p className="one-item-info">سعر البيع :  {truncateToTwoDecimals(selectedItem.price + (selectedItem.price * selectedItem.profit))} $</p>
            <p className="one-item-info">نسبة الربح : {selectedItem.profit * 100} %</p>
            <p className="one-item-info"> تاريخ انتهاء الصلاحية : {formatDateTime(selectedItem.expiry_date)}</p>
            <p className="one-item-info">الكود : {selectedItem.code}</p>
            <p className="one-item-info">تاريخ الاضافة : {formatDateTime(selectedItem.createdAt)}</p>
            {selectedItem.isUpdated && <p className="one-item-info"> معدل</p>}
           {selectedItem.isUpdated && <p className="one-item-info">تاريخ اخر تعديل : {formatDateTime(selectedItem.updatedAt)}</p>}
         </div>
    </div>

  );
}