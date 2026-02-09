import { API_URL } from './URL';
import { getToken } from './locaStorageToken';
const route: string = '/warehouse';
type SupplierData = {
    name:string,
    phone_number:string,
    location:string,
    warehouse_name:string

}
export async function editSupplierApi(id:number,Sdata:SupplierData){

    const token = await getToken()
    if(!token){
         return {
            success: false,
            message: 'قم بتسجيل الدخول أولاً',
        }
    
    }
    if(!id){
         return {
            success: false,
            message: 'error in id',
        }
    
    }

    if(!Sdata.name || !Sdata.phone_number){
     return {
            success: false,
            message: 'نقص في معلومات المورد',
        }
    
    }

    try{

         const response = await fetch(API_URL + route+'/update/'+id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(Sdata),
            });
            const data = await response.json();
            if(response.ok) {
                return {
                    success: true,
                    data: data
                };
            } else {
                return {
                    success: false,
                    message: data.error || "حدث خطأ ما"
                };
            }

    }catch(error){
         return {
            success: false,
            message: error || 'يوجد خطا في عملية التعديل',
        }
    
    }

}