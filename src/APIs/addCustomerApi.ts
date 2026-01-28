import { API_URL } from './URL';
import { getToken } from './locaStorageToken';
const route: string = '/customer';

type CustomerData = {
    name: string,
    location:string,
    phone_number:string,
};


export async function addCustomerApi(customerData: CustomerData){
    const token = getToken();
    if(!token){
        return {
            success: false,
            message: 'قم بتسجيل الدخول أولاً',
        }
    }
    if(!customerData.name || !customerData.location || !customerData.phone_number){
        return {
            success: false,
            message: 'All fields are required',
        }
    }

    try{
const response = await fetch(API_URL + route + '/create', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token,
    },
    body: JSON.stringify(customerData),
});
const data = await response.json();
if(response.ok){
    return {
        success: true,
        data: data,
    }
}


    }catch (error) {
        return {
            success: false,
            message: error || 'حدث خطأ ما، يرجى المحاولة مرة أخرى',
        }
    }
}
