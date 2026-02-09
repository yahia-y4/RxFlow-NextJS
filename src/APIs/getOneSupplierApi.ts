import { API_URL } from './URL';
import { getToken } from './locaStorageToken';
const route: string = '/warehouse';


export async function getOneSupplierApi(id:number){
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
            message: 'error in id'
        }
    }

    try {
        const response = await fetch(API_URL + route+'/getById/'+id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

     const data = await response.json();
        if(response.ok) {
            return {
                success: true,
                message: 'Supplier retrieved successfully',
                supplier: data,
            }
        } else {
            return {
                success: false,
                message: data.error || 'Supplier retrieval failed',
            }
        }

    }catch(error){
            return {
                success: false,
                message: error || 'Supplier retrieval failed',
            }
    }
}