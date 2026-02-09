
import { API_URL } from './URL';
import { getToken } from './locaStorageToken';
const route: string = '/items';

export async function getOneItemApi(id: number){
    const token = getToken();
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

        const response = await fetch(API_URL + route+'/getOne/'+id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            },
        });
        const data = await response.json();
        if(response.status === 200){
            return {
                success: true,
                message: 'item fetched successfully',
                data,
            }
        }else{
            return {
                success: false,
                message: data.error || 'حدث خطأ ما، يرجى المحاولة مرة أخرى',
            }
        }
    }catch(error){
        return {
            success: false,
            message: 'error in get one item',
        }
    }


}
