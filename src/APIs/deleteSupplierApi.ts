import { API_URL } from './URL';
import { getToken } from './locaStorageToken';
const route: string = '/warehouse';

export async function deleteSupplierApi(id:number){
    const token = await getToken();
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
    try{

        const response = await fetch(API_URL + route+'/delete/'+id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
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
        return{
            success:false,
            message: error || "حدث خطأ ما" 
        }
    }   
}