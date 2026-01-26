
import { API_URL } from './URL';
import { getToken } from './locaStorageToken';
const route: string = '/items';

export async function deleteItemApi(id:number){
const token = await getToken();
if(!token){
    return {
        success: false,
        message: 'قم بتسجيل الدخول أولاً',
    }
}
try{
    const response = await fetch(API_URL + route+'/delete/'+id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token,
        },
    });
    const data = await response.json();
        return {
            success: true,
            message: 'Item deleted successfully',
        }
    
  
  
}catch(error){
  return {
        success: false,
        message: 'Error deleting item',
    };
}


}