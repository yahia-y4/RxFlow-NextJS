import { API_URL } from './URL';
import { getToken } from './locaStorageToken';
const route: string = '/statistics';



export async function GeneralStatistics_SuppliersApi(){

    const token = getToken();
    if(!token){
        return {
            success: false,
            message: 'قم بتسجيل الدخول أولاً',
        }
    }
    try{
        const response = await fetch(API_URL + route +'/GeneralStatistics_Suppliers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            },
        }); 
        const data = await response.json();
        if(response.ok){
            return {
                success: true,
                statistics: data,
            }
        }
    }catch (error) {
        return {
            success: false,
            message: error || 'حدث خطأ ما، يرجى المحاولة مرة أخرى',
        }
    }
}