
import { API_URL } from './URL';
import { getToken } from './locaStorageToken';
const route: string = '/purchaseInvoice';



export async function getAllPurchaseInvoiceApi(){

    const token = getToken();
    if(!token){
        return {
            success: false,
            message: 'قم بتسجيل الدخول أولاً',
        }
    }
    try{
        const response = await fetch(API_URL + route + '/getAll', {
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
                invoice: data,
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