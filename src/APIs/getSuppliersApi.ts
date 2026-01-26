import { API_URL } from './URL';
import { getToken } from './locaStorageToken';
const route: string = '/warehouse';

export async function getSuppliersApi(){
    const token = await getToken();
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
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if(response.ok) {
            return {
                success: true,
                message: 'Suppliers retrieved successfully',
                suppliers: data,
            }
        } else {
            return {
                success: false,
                message: data.message || 'Suppliers retrieval failed',
            }
        }
    } catch (error) {
        return {
            success: false,
            message: 'An error occurred while retrieving the suppliers',
        }
    }
}
