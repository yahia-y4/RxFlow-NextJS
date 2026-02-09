import { API_URL } from './URL';
import { getToken } from './locaStorageToken';

const route = '/purchaseInvoice';

type PurchaseInvoiceItem = {
  id: number;
  quantity: number;
  price: number;
};

type PurchaseInvoiceData = {
  warehouseId: number;
  paid_amount: number;
  note: string;
  items: PurchaseInvoiceItem[];
};

export async function addPurchaseInvoiceApi(Pdata: PurchaseInvoiceData) {
  const token = await getToken();

  if (!token) {
    return {
      success: false,
      message: 'قم بتسجيل الدخول أولاً',
    };
  }

  if (Pdata.warehouseId == null || Pdata.paid_amount == null) {
    return {
      success: false,
      message: 'نقص في معلومات الفاتورة',
    };
  }

  if (Pdata.items.length === 0) {
    return {
      success: false,
      message: 'نقص في معلومات الفاتورة',
    };
  }

  try {
    const response = await fetch(`${API_URL}${route}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(Pdata),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: 'Purchase invoice created successfully',
      };
    } else {
      return {
        success: false,
        message: data.error || 'Purchase invoice creation failed',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error||'An error occurred while creating the purchase invoice',
    };
  }
}

