import { API_URL } from './URL';
import { getToken } from './locaStorageToken';
const route: string = '/customer';

export async function getReceivePaymentCustomerApi(customerId: number) {
    const token = getToken();
    if (!token) {
        return {
            success: false,
            message: 'قم بتسجيل الدخول أولاً',
        }
    }
    if (!customerId) {
        return {
            success: false,
            message: 'Customer ID is required',
        }
    }
    try {
        const response = await fetch(API_URL + route + `/getReceive_Payment/${customerId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        });
        const data = await response.json();
        if (response.ok) {
            return {
                success: true,
                payments: data,
            }
        }else{
            return {
                success: false,
                message: data.error || 'حدث خطأ ما، يرجى المحاولة مرة أخرى',
            }
        }
    } catch (error) {
        return {
            success: false,
            message: error || 'حدث خطأ ما، يرجى المحاولة مرة أخرى',
        }
    }
    
}