
import {setToken} from './locaStorageToken'
import { API_URL } from './URL';
const route: string = '/user';

export async function loginApi(Email: string, Password: string){
    if (!Email || !Password) {
        return {
            success: false,
            message: 'Email and Password are required'
        }
    }
    try{
    const response = await fetch(API_URL + route + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Email,
            Password
        })
    })
    const data = await response.json()
    if (response.ok) {
        setToken(data.token)
        return {
            success: true,
            message: 'Login successful',
            token: data.token
        }
    } else {
        return {
            success: false,
            message: data.error
        }
    }
    }catch(error){
        return {
            success: false,
            message: "Login failed"
        }
    }

}