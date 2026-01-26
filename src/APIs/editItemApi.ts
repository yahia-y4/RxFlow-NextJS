
import { API_URL } from './URL';
import { getToken } from './locaStorageToken';
const route: string = '/items';

export async function editItemApi(
    id:number,
    name: string,
    company:string,
    form:string,
    concent:number,
    concent_unit:string,
    titer:number,
    titer_unit:string,
    package_type:string,
    quantity:number,
    price:number,
    profit:number,
    code:string,
    expiry_date:string,
) {
    const token = await getToken();
    if(!token){
        return {
            success: false,
            message: 'قم بتسجيل الدخول أولاً',
        }
    }
    console.log(token);
    if(!name || !company || !form || !concent || !concent_unit || !titer || !titer_unit || !package_type || !quantity || !price || !profit || !code || !expiry_date){
        return {
            success: false,
            message: 'All fields are required',
        }
    }
    try {
        const response = await fetch(API_URL + route+'/update/'+id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            },
            body: JSON.stringify({
                name,
                company,
                form,
                concent,
                concent_unit,
                titer,
                titer_unit,
                package_type,
                quantity,
                price,
                profit,
                code,
                expiry_date,
            }),
        });
        const data = await response.json();
        if(response.status === 200){
            return {
                success: true,
                message: 'Item updated successfully',
                data
            }
        }
        return {
            success: false,
            message: data.message,
        }
    } catch (error) {
        return {
            success: false,
            message: 'An error occurred',
        }
    }
}
