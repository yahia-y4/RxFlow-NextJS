import { API_URL } from './URL';
import { getToken } from './locaStorageToken';
const route: string = '/warehouse';
 type PaymentSupplier={
    payable_amount_send:number,
    note:string,
}
export async function sendPaymentSupplierApi(id:number,paymentData:PaymentSupplier){

    const token = await getToken();
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
    if(!paymentData.payable_amount_send){
        return{
            success:false,
            message:"نقص في معلومات الدفع"
        }
}

try{
    const response = await fetch(API_URL + route+'/sendPayment/'+id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(paymentData),
    });
    const data = await response.json();
    if(response.ok) {
        return {
            success: true,
            data: data
        };
    }
    else {
        return {
            success: false,
            message: data.message || "حدث خطأ ما"
        };
    }
}catch(error){
    return{
        success:false,
        message: error || "حدث خطأ ما" 
    }
    
}
}