
import { API_URL } from './URL';
import { getToken } from './locaStorageToken';
const route: string = '/customer';


type EditCustomerData = {
    name: string,
    phone_number: string,
    location: string,
};


export async function editCustomerApi(customerId: number, customerData: EditCustomerData){
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
    if(!customerData.name || !customerData.location || !customerData.phone_number){
        return {
            success: false,
            message: 'All fields are required',
        }
    }
    try{
const response = await fetch(API_URL + route + `/update/${customerId}`, {
    method: 'PUT',
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