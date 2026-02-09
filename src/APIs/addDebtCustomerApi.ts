import { API_URL } from "./URL";
import { getToken } from "./locaStorageToken";
const route: string = "/customer";

type DebtCustomerData = {
  amount: number;
  note: string;
};

export async function addDebtCustomerApi(
  customerId: number,
  debtData: DebtCustomerData,
) {
  const token = getToken();
  if (!token) {
    return {
      success: false,
      message: "قم بتسجيل الدخول أولاً",
    };
  }
  if (
    !customerId ||
    !debtData.amount ||
    debtData.amount <= 0 ||
    !debtData.note
  ) {
    return {
      success: false,
      message: "خطأ في بيانات الدين المدخلة",
    };
  }
  try {
    const response = await fetch(API_URL + route + `/addDebt/${customerId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(debtData),
    });
    const data = await response.json();
    if (response.ok) {
      return {
        success: true,
        data: data,
      };
    } else {
      return {
        success: false,
        message: data.error || "حدث خطأ ما، يرجى المحاولة مرة أخرى",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error || "حدث خطأ ما، يرجى المحاولة مرة أخرى",
    };
  }
}
