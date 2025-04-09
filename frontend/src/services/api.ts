import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // آدرس سرور

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',

  },
});

const handleDelete = async (id: string) => {
  try {
    const response = await deleteHall(id); // اطمینان حاصل کنید که id به درستی ارسال می‌شود
    console.log("Hall deleted successfully", response);
  } catch (error) {
    console.error("Error deleting hall", error);
  }
};

export const deleteHall = async (hallId: string) => {
  try {
    const response = await fetch(`/api/halls/${hallId}`, {
      method: 'DELETE', // متد DELETE برای حذف اطلاعات
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete hall');
    }

    return response.json();
  } catch (error) {
    console.error('Error deleting hall:', error);
    throw error;
  }
};

export const getData = async <T>(endpoint: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.get(endpoint);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const postData = async <T>(endpoint: string, data: unknown): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const fetchHalls = async () => {
  try {
    const response = await api.get('/halls'); // مسیر GET سالن‌ها
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const createHall = async (hallData: any) => {
  try {
    const response = await api.post('/halls/create', hallData); // مسیر POST برای ساخت سالن
    return response.data;
  } catch (error) {
    console.error('Error creating hall:', error);
    throw error;
  }
};

const handleApiError = (error: unknown): void => {
  if (axios.isAxiosError(error) && error.response) {
    console.error(`API Error: ${error.response.status} ${error.response.statusText}`);
  } else {
    console.error('Unexpected error', error);
  }
};

export default api;
