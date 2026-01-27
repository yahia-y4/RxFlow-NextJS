import { API_URL } from './URL';
import { getToken } from './locaStorageToken';
const route: string = '/warehouse';

type supplierData={
    name: string,
    phone_number: string,
    location: string,
    warehouse_name: string,
    payable_amount: number,
    paid_amount: number
}

export async function addSupplierApi(Sdata:supplierData){
    const token = await getToken();
    if(!token){
        return {
            success: false,
            message: 'قم بتسجيل الدخول أولاً',
        }
    }
    if(!Sdata.name || !Sdata.phone_number){
        return{
            success:false,
            message:"نقص في معلومات المورد"
        }
}

try{

    const response = await fetch(API_URL + route+'/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(Sdata),
    });
    const data = await response.json();
    if(response.ok) {
        return {
            success: true,
            data: data
        };
    } else {
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