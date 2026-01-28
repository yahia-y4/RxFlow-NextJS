 import { API_URL } from './URL';
import { getToken } from './locaStorageToken';
const route: string = '/customer';



export async function deleteCustomerApi(customerId: number){
    const token = getToken();
    if(!token){
        return {
            success: false,
            message: 'قم بتسجيل الدخول أولاً',
        }
    }
    if(!customerId){
        return {
            success: false,
            message: 'Customer ID is required',
        }
    }
    try{
const response = await fetch(API_URL + route + `/delete/${customerId}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token,
    },
});
const data = await response.json();
if(response.ok){
    return {
        success: true,
        message: data.message || 'تم حذف الزبون بنجاح',
    }
}else{
    return {
        success: false,
        message: data.message || 'فشل في حذف الزبون',
    }
}

    }catch (error) {
        return {
            success: false,
            message: error || 'حدث خطأ ما، يرجى المحاولة مرة أخرى',
        }
    }
}