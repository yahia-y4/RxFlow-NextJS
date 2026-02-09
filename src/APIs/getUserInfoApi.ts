import { getToken } from "./locaStorageToken";
import { API_URL } from "./URL";
const route: string = "/user";

export async function getUserInfoApi() {
  const token = await getToken();
  if (!token) {
    return {
      success: false,
      message: "قم بتسجيل الدخول أولاً",
    };
  }

  try {
    const response = await fetch(API_URL + route + "/getUserInfo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      return {
        success: true,
        message: "User info retrieved successfully",
        userInfo: data,
      };
    } else {
      return {
        success: false,
        message: data.error || "User info retrieval failed",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error || "User info retrieval failed",
    };
  }
}
