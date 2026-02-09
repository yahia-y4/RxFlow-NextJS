
import { API_URL } from './URL';
import { getToken } from './locaStorageToken';
const route: string = '/statistics';


export async function TopSellingBySalesApi(){
    const token = getToken();
    if(!token){
        return {
            success: false,
            message: 'قم بتسجيل الدخول أولاً',
        }
    }
    try{
        const response = await fetch(API_URL + route +'/TopSellingBySales', {
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
        }else{
            return {
                success: false,
                message: data.error || 'حدث خطأ ما، يرجى المحاولة مرة أخرى',
            }
        }
    }catch (error) {
        return {
            success: false,
            message: error || 'حدث خطأ ما، يرجى المحاولة مرة أخرى',
        }
    }
}

