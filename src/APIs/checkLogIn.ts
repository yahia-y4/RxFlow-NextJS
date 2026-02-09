import { getToken} from './locaStorageToken';
    export async function checkLogIn() {
      const token = await getToken();
      if (token) {
        return true;
      }
      return false;
    }