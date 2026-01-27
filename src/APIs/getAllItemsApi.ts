
import { API_URL } from './URL';
import { getToken } from './locaStorageToken';
const route: string = '/items';

export async function getAllItemsApi(){
    const token = getToken();
    if(!token){
        return {
            success: false,
            message: 'قم بتسجيل الدخول أولاً',
        }
    }
   
    try {
        const response = await fetch(API_URL + route+'/getAll', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            },
        });
        const data = await response.json();
        if (response.ok) {
        return {
            success: true,
            items: data,
        };
    }
    } catch (error) {
        return {
            success: false,
            message: error || 'Error fetching items',
        }
    }
}
