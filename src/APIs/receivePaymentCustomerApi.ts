import { API_URL } from './URL';
import { getToken } from './locaStorageToken';
const route: string = '/customer';

type ReceivePaymentData = {
    amount: number,
    note: string,
}

export async function receivePaymentCustomerApi(customerId: number, paymentData: ReceivePaymentData){
    const token = getToken();
    if(!token){
        return {
            success: false,
            message: 'قم بتسجيل الدخول أولاً',
        }
    }
    if(!customerId || !paymentData.amount || paymentData.amount <= 0){
        return {
            success: false,
            message: 'خطأ في بيانات الدفع المدخلة',
        }
    }
    try{
const response = await fetch(API_URL + route + `/receivePayment/${customerId}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token,
    },
    body: JSON.stringify(paymentData),
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