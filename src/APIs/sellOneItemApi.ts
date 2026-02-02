
import { API_URL } from './URL';
import { getToken } from './locaStorageToken';
const route: string = '/items';
type SellItemData = {
    items: [
        {
            id:number,
            quantity:number,
            salePrice:number
        }
    ]
}
export async function sellOneItemApi(seleData:SellItemData){

    const token = await getToken();
    if(!token){
        return {
            success: false,
            message: 'قم بتسجيل الدخول أولاً',
        }
    }
    if(seleData.items[0].id==0 || seleData.items[0].quantity <=0 || seleData.items[0].salePrice<=0){

        return {
            success: false,
            message: 'تأكد من البيانات المدخلة',
        }
    }
    try{

        const response = await fetch(API_URL + route+'/sell', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(seleData), 
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
                message: data.error || "حدث خطأ ما"
            };
        }
    }catch(error){
        return{
            success:false,
            message: error || "حدث خطأ ما" 
        }
    }
}