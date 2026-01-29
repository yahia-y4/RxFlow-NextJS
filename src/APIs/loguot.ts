import { getToken,removeToken } from './locaStorageToken';

   export async function logoutF() {
      const token = await getToken();
      if (token) {
        await removeToken();
      }
    }