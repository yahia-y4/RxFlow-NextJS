import { API_URL } from './URL';
const route: string = '/user';
export async function CreateNewUser(UserName:string,Email:string,Password:string) {
  if(!UserName || !Email || !Password) {
    return {
      success: false,
      message: 'All fields are required',
    }
}
    try{
        const response = await fetch(`${API_URL}${route}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            UserName,
            Email,
            Password,
          }),
        });
        const data = await response.json();
        if(response.ok) {
          return {
            success: true,
            message: 'User created successfully',
          }
        } else {
          return {
            success: false,
            message: data.error || 'User creation failed',
          }
        }
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while creating the user',
      }
    }
  }

  

